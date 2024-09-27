import axios from 'axios';
import { API_BASE_URL } from '../../api/apiUrl';

// eslint-disable-next-line react/prop-types
const DeleteTaskButton = ({ id, onDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      onDeleted(id);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <a href="#" onClick={handleDelete}>
      <img src="/delete.svg" className="w-6 hover:animate-wiggle" alt="icono de editar" />
    </a>
  );
};

export default DeleteTaskButton;
