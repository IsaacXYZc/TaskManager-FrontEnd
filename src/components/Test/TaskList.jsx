import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import CreateTaskButton from "./CreateTaskButton";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/apiUrl";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('createdAt-desc');
  const [shouldSort, setShouldSort] = useState(false);
  const pendingTasks = tasks.filter(task => task.status === 1);
  const inProgressTasks = tasks.filter(task => task.status === 2);
  const completedTasks = tasks.filter(task => task.status === 3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if(!localStorage.getItem('token')) {
        setError("No autorizado.")
        setTimeout(() => {
          alert('No has iniciado sesión');
          console.log("Mensaje")
          navigate("/login")
        }, 1000);
      } else {
        await axios.get(
          API_BASE_URL+"/tasks/sorted",
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
    }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (shouldSort) {
      handleSort(sortBy);
    }
  }, [shouldSort]);

  const handleTaskCreated = async (newTask) => {
    await setShouldSort(true);
    setTasks( [...tasks, newTask]);
  };

  const handleTaskUpdated = async (updatedTask) => {
    await setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setShouldSort(true);
  };

  const handleTaskDeleted = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  const handleLogout = () => {
    navigate("/login");
    localStorage.clear('token');
  } 

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
    const [atribute, direction] = sortBy.split('-');
    const sortedTasks = [...tasks].sort( (a,b) => {
      if (a[atribute] < b[atribute]) return direction === 'asc' ? -1 : 1;
      if (a[atribute] > b[atribute]) return direction === 'asc' ? 1 : -1;
      return 0;
    })
    setShouldSort(false);
    setTasks(sortedTasks);
  }
  return (
  <div className="">
    <div className="flex justify-between">
      <h1 className="text-xl font-semibold">Lista de tareas</h1>
      <select
        value={sortBy}
        onChange={(e) => handleSort(e.target.value)}
        className="border rounded"
      >
        <option value="createdAt-desc">Creadas más recientemente</option>
        <option value="createdAt-asc">Creadas hace más tiempo</option>
        <option value="priority-desc">Mas importantes primero</option>
        <option value="priority-asc">Menos importantes primero</option>
      </select>
      <button  onClick={handleLogout} className=" text-lg hover:underline rounded border-black " >Cerrar sesión</button>
    </div>
    {error ? 
    (
      <p className="text-red-600 font-semibold">{error}</p>
    ):( 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-red-500 min-h-screen">
          <div className="flex flex-wrap gap-6 justify-center text-white w-full shadow-lg py-2">
            <p className="text-4xl">Pendientes</p> 
            <CreateTaskButton 
            status={1}
            onCreated={handleTaskCreated}
            />
          </div>
          <ul className="flex flex-wrap place-content-around">
            {pendingTasks.map( task => (
              <li key={task.id}> 
                <TaskCard 
                key={task.id} 
                task={task} 
                onUpdated={handleTaskUpdated} 
                onDeleted={handleTaskDeleted}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-500 min-h-screen">
        <div className="flex flex-wrap gap-6 justify-center text-white w-full shadow-lg py-2">
            <p className="text-4xl">En progreso</p> 
            <CreateTaskButton 
            status={2}
            onCreated={handleTaskCreated}
            />
          </div>
          <ul className="flex flex-wrap place-content-around">
            {inProgressTasks.map( task => (
              <li key={task.id}> 
                <TaskCard 
                key={task.id} 
                task={task} 
                onUpdated={handleTaskUpdated} 
                onDeleted={handleTaskDeleted}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-green-400 min-h-screen">
        <div className="flex flex-wrap gap-6 justify-center text-white w-full shadow-lg py-2">
            <p className="text-4xl">Completadas</p> 
            <CreateTaskButton 
            status={3}
            onCreated={handleTaskCreated}
            />
          </div>
          <ul className="flex flex-wrap place-content-around">
            {completedTasks.map( task => (
              <li key={task.id}> 
                <TaskCard 
                key={task.id} 
                task={task} 
                onUpdated={handleTaskUpdated} 
                onDeleted={handleTaskDeleted}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )} 
  </div>
);
}

export default TaskList;