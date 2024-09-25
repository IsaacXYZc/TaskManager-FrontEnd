import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import UpdateTaskButton from "./UpdateTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";
import CreateTaskButton from "./CreateTaskButton";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_BASE_URL;


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(
        apiUrl+"/tasks",
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch(function (){
        let errorMessage = "Error desconocido";
        if (error.response) {
          errorMessage = error.response.data;
        } else if (error.request) {
          errorMessage = "No se recibió respuesta del servidor";
        } else {
          errorMessage = error.message;
        }
        setError(errorMessage);
      })
    };
    fetchData();
  }, []);

  const handleEdit = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleTaskDeleted = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  const exitButton = () => {
    navigate("/login");
    localStorage.clear('token');
  } 

  return (
  <div className="overflow-hidden bg-background min-h-screen text-center text-align-center py-6">
    <button  onClick={exitButton} className="absolute sm:left-20 left-0 text-xl hover:underline rounded border-black px-2" >Cerrar sesión</button>
    <h1 className="text-3xl font-bold mb-6">LISTA DE TAREAS</h1>
    {error ? 
    (
      <p className="text-red-600 font-semibold">{error}</p>
    ):( 
      <div>
        <CreateTaskButton onTaskCreated={handleTaskCreated} />
        <ul className="flex flex-wrap justify-center">
          {tasks.map( task => (
            <li key={task.id}> 
              <TaskCard key={task.id} task={task}
              />
              <div className="flex gap-4">
                <UpdateTaskButton task={task} onTaskUpdated={handleTaskUpdated} />
                <DeleteTaskButton task={task} onTaskDeleted={handleTaskDeleted} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    )} 
  </div>
);
}

export default TaskList;