import { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_BASE_URL;


const UpdateTaskButton = ({ task, onTaskUpdated }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSave = async (updatedTask) => {
    try {
      const response = await axios.put(`${apiUrl}/tasks/${task.id}`, {
        title: updatedTask.title,
        description: updatedTask.description,
        priority: updatedTask.priority,
        completed: updatedTask.completed
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      onTaskUpdated(response.data);
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="bg-blue-500 text-white rounded p-2">
       Editar✍
      </button>
      <EditTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        task={task} 
        onSave={handleSave} 
      />
    </>
  );
};

export default UpdateTaskButton;
