/* eslint-disable react/prop-types */
import { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import axios from 'axios';
import { API_BASE_URL } from '../../api/apiUrl';


const CreateTaskButton = ({ status, onCreated }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSave = async (newTask) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, newTask, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      onCreated(response.data);
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <>
      <a href="#" onClick={() => setModalOpen(true)}>       
        <img src="/add.svg" className="w-10 hover:animate-wiggle" alt="icono de agregar" />
      </a>
      <EditTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        task={{ title:"", description:"", priority:1, status:status}} 
        onSave={handleSave} 
      />
    </>
  );
};

export default CreateTaskButton;
