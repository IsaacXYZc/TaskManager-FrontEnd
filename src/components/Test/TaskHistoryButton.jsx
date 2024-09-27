import axios from "axios";
import { API_BASE_URL } from "../../api/apiUrl";
import { useState } from "react";

const TaskHistoryButton = ({ id, isOpen, onClick}) => {
    const [response, setResponse] = useState("");
    const [error, setError] = useState('');
    
    const handleClick = async () => {
      try {
        await axios.get(`${API_BASE_URL}/tasks/history/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(function (response) {
            setResponse(response.data);
            console.log(response.data);
          })
          .catch(function (){
            let errorMessage = "Error desconocido";
            if (error.response) {
              errorMessage = error.response.data;
            } else if (error.request) {
              errorMessage = "No se recibió respuesta del servidor";
            } else {
              errorMessage = error.message;
            }
            setError(errorMessage);
            console.log(error);
          });
        onClick();
      } catch (error) {
        console.error("Error geting task history", error);
      }
    };
  
    if(!isOpen)
        return (
        <a href="#" onClick={handleClick}>  
            <div className=" flex justify-center text-gray-500 text-sm">historial de cambios<img src="/chevron-down.svg" className="w-4" alt="Icono de eliminar" /></div>
        </a>
        );
    return (
        <a href="#" onClick={handleClick}>  
            <div className="flex justify-center text-gray-500 text-sm">ocultar historial de cambios<img src="/chevron-down.svg" className="w-4 rotate-180" alt="Icono de eliminar" /></div>
            <ul className="text-sm text-green-800">
            {response.map( history => (
              <li key={history.id}> 
                <p className="font-semibold">
                    {new Date(history.modifiedAt).toLocaleDateString() + " " + new Date(history.modifiedAt).toLocaleTimeString()} 
                </p>
                <p style={{ whiteSpace: 'pre-wrap' }}>
                    {history.description}
                </p>
              </li>
            ))}
          </ul>
        </a>
    );
  };

export default TaskHistoryButton;