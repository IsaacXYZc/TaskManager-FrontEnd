import axios from 'axios';
import { API_BASE_URL } from '../../api/apiUrl';

const DeleteTaskButton = ({ task, onTaskDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${task.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      onTaskDeleted(task.id);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white rounded p-2">
      Eliminar 🗑
    </button>
  );
};

export default DeleteTaskButton;
