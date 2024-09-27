import { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import axios from 'axios';
import { API_BASE_URL } from '../../api/apiUrl';


const UpdateTaskButton = ({ task, onUpdated }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSave = async (updatedTask) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${task.id}`, {
        title: updatedTask.title,
        description: updatedTask.description,
        priority: updatedTask.priority,
        status: updatedTask.status
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      onUpdated(response.data);
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <>
      <a href="#" onClick={() => setModalOpen(true)}>
        <img src="/edit.svg" className="w-6 hover:animate-wiggle" alt="icono de editar" />
      </a>
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
