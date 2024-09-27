/* eslint-disable react/prop-types */
import { useState } from 'react';

export default function EditTaskModal ({ isOpen, onClose, task, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status)

  const handleSave = () => {
    const updatedTask = { ...task, title, description, priority, status};
    onSave(updatedTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="overflow-y-auto text-black overflow-x-hidden bg-black bg-opacity-80 fixed top-0 right-0 left-0 z-40 justify-center items-center w-full md:inset-0 h-screen max-h-screen flex">
      <div className="flex flex-col gap-4 bg-white p-4 rounded shadow-lg z-50 min-w-[20rem] sm:min-w-[30rem]">
      <h2 className='text-xl'>Tareas</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="mb-2 p-2 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          className="mb-2 p-2 border rounded"
        />
        <p>Prioridad:</p>
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="mb-2 p-2 border rounded"
        >
          <option value={1}>No importante</option>
          <option value={2}>Importante</option>
          <option value={3}>Urgente</option>
        </select>
        <p>Estado:</p>
        <select
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
          className="mb-2 p-2 border rounded"
        >
          <option value={1}>Pendiente</option>
          <option value={2}>En progreso</option>
          <option value={3}>Completada</option>
        </select>
        <div className="self-center">
          <button onClick={onClose} className="bg-gray-300 rounded p-2 mx-4">Cancelar</button>
          <button onClick={handleSave} className="bg-primary rounded p-2 mx-4">Guardar</button>
        </div>
      </div>
    </div>
  );
};
