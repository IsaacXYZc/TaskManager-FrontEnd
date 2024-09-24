import axios from "axios";
import { API_BASE_URL } from "../Services/api";
import { useState } from "react";

export default function TaskCard({ task, onEdit ,   onDelete}){
  const {id, title, description, priority, createdAt, modifiedAt, completed} = task;
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');

  const getPriorityText = (priority) => {
    switch(priority) {
      case 1: return 'Baja';
      case 2: return 'Media';
      case 3: return 'Alta';
      case 4: return 'URGENTE';
      default: return 'Desconocida';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'bg-blue-200 text-blue-800';   // Baja
      case 2: return 'bg-yellow-200 text-yellow-800';  // Media
      case 3: return 'bg-orange-300 text-orange-800';  // Alta
      case 4: return 'bg-red-200 text-red-800';     // Urgente
      default: return 'bg-gray-400 text-white';   // Desconocida
    }
  };

  

  const handleEditClick = () => {
    setModalOpen(true);
  };
  
  const handleSave = async (updatedTask) => {
    await axios.put(
      API_BASE_URL+`/tasks/${id}`,
      {
        title: updatedTask.title,
        description: updatedTask.description,
        priority: updatedTask.priority,
        completed: updatedTask.completed
      },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(function (response) {
      onEdit(response.data);
    })
    .catch(function (error){
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
 
  const handleDelete = async () => {
    await axios.delete(
      API_BASE_URL+`/tasks/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(function () {
      onDelete(id);
      console.log("Tarea eliminada");
    })
    .catch(function (error){
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

  return (
  <div className="text-left relative rounded-lg min-w-[22rem] md:min-w-[35rem] bg-white overflow-none shadow-2xl m-6 px-6 py-4">
    <div className="font-semibold text-xl mb-2">{title}</div>
    <p className="px-4 text-base mb-2 rounded border-2 border-gray-400 bg-gray-200">{description}</p>
      
    <div className="mb-2 flex flex-col sm:flex-row space-x-2">
      <span className="text-gray-400">Creada</span>
      <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" className="fill-none stroke-2 stroke-gray-600 size-6">
        <path  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
        </svg>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
    <div className="mb-2 flex flex-col sm:flex-row space-x-2">
      <span className="text-gray-400">Modificada</span>
      <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" className="fill-none stroke-2 stroke-gray-600 size-6">
        <path  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
        </svg>
        <span>{modifiedAt?new Date(modifiedAt).toLocaleDateString():"Aun no ha sido modificada"}</span>
      </div>
    </div>
    <div className={`absolute -bottom-3 px-4 border-2 rounded-xl ${completed?"border-gray-400 text-gray-500 bg-blue-100":"border-red-400 text-red-600 bg-yellow-100"}`}>
        {completed?"Completada":"Pendiente"}
    </div>
    <div className="text-right">
      <span className="text-gray-400">Prioridad: </span>
      <span className={`${getPriorityColor(priority)} font-semibold rounded px-2 `}>{getPriorityText(priority)}</span>
    </div>
      
  </div>
  );
}
