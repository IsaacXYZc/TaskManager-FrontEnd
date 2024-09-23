import { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import axios from 'axios';
import { API_BASE_URL } from '../Services/api';

const UpdateTaskButton = ({ task, onTaskUpdated }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSave = async (updatedTask) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${task.id}`, {
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
      <button onClick={() => setModalOpen(true)} className="bg-primary rounded p-2">
        Actualizar Tarea
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
