import { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_BASE_URL;


const CreateTaskButton = ({ onTaskCreated }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSave = async (newTask) => {
    try {
      const response = await axios.post(`${apiUrl}/tasks`, newTask, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      onTaskCreated(response.data);
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="bg-primary rounded p-2">
        Crear Tarea
      </button>
      <EditTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        task={{ title:"", description:"", priority:1, completed:false}} 
        onSave={handleSave} 
      />
    </>
  );
};

export default CreateTaskButton;
