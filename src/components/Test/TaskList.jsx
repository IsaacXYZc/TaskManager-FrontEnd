import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Services/api";
import axios from "axios";
import TaskCard from "./TaskCard";
import UpdateTaskButton from "./UpdateTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";
import CreateTaskButton from "./CreateTaskButton";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(
        API_BASE_URL+"/tasks",
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

  return (
  <div className="overflow-hidden bg-background text-center text-align-center py-6">
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