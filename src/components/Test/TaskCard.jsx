/* eslint-disable react/prop-types */
import UpdateTaskButton from "./UpdateTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";
import TaskHistoryButton from "./TaskHistoryButton";
import { useState } from "react";

export default function TaskCard({ task, onUpdated, onDeleted}){
  const {id, title, description, priority, createdAt, modifiedAt, status} = task;
  const [isTaskHistoryOpen, setTaskHistoryOpen] = useState(false);

  const getPriorityText = (priority) => {
    switch(priority) {
      case 1: return 'No importante';
      case 2: return 'Importante';
      case 3: return 'Urgente';
      default: return 'Desconocida';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'bg-blue-200 text-blue-800';   // Baja
      case 2: return 'bg-yellow-200 text-yellow-800';  // Media
      case 3: return 'bg-red-200 text-red-800';     // Urgente
      default: return 'bg-gray-400 text-white';   // Desconocida
    }
  };


  return (
    <div className="flex flex-col gap-2 bg-white w-[20rem] border-2 my-2 rounded-lg px-3 py-2 shadow-xl"> 
      <div className="flex justify-between">
        {title? <div className="font-bold text-lg">{title}</div>: <p className="font-bold italic">No hay  título</p>}
        <div className="flex space-x-3">
          <UpdateTaskButton
          task={task}
          onUpdated={onUpdated}
          />
          <DeleteTaskButton
          id={id}
          onDeleted={onDeleted}
          />
        </div>
      </div>
      {description ? 
      <p>{description}</p>
      :<p className="text-gray-400 italic">No hay desccripción</p>}
      <TaskHistoryButton
      id={id}
      isOpen={isTaskHistoryOpen}
      onClick={()=> setTaskHistoryOpen(!isTaskHistoryOpen)}
      />
      <div className="flex justify-between">
        <div className="flex">
          <img src="/calendar.svg" className="w-6" alt="Icono de calendario" />
          <span className="text-sm self-end">
            {new Date(createdAt).toLocaleDateString() + " " + new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>        
        </div>
        <span className={`${getPriorityColor(priority)} font-semibold rounded px-2 `}>{getPriorityText(priority)}</span>
      </div>
    </div>
  
  );
}
