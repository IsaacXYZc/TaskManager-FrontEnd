import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_BASE_URL;


const DeleteTaskButton = ({ task, onTaskDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/tasks/${task.id}`, {
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
    <button onClick={handleDelete} className="bg-error rounded p-2">
      Eliminar Tarea
    </button>
  );
};

export default DeleteTaskButton;
