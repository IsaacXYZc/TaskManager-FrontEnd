import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../api/apiUrl";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await axios.post(
      API_BASE_URL+`/auth/login`,{
        email,
        password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log(response.data);
      localStorage.setItem('token', response.data);
      navigate("/tasks");
    })
    .catch(function (error){
      let errorMessage = "Error desconocido";
      if (error.response) {
        errorMessage = error.response.data;
      } else if (error.request) {
        errorMessage = "No se recibió respuesta del servidor";
      } else {
        errorMessage = error.message;
      }
      setError(errorMessage);
    }).finally(function () {
      setLoading(false);
    });
     
  }

  return (

      <div className="bg-background flex justify-center items-center text-center min-h-screen ">
        <div className="bg-secondary p-10 rounded shadow-custom-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">
            <div className="font-semibold text-primary text-2xl mb-2 text-center">Iniciar Sesión</div>
            {loading && <div className="flex justify-center mb-4">
              <img src="/spin.svg" className="animate-spin w-12 h-12" alt="Descripción de la imagen" />
            </div>}
            {error && <p className="text-error font-semibold">{error}</p>}
            <div className="relative group mt-6">
              <input onChange={(e) => setEmail(e.target.value)} type="email" className="bg-secondary-light outline-none p-2 w-full peer"  placeholder="" required></input>
              <label className="absolute py-2 h-full left-2 pointer-events-none group-focus-within:-translate-y-full peer-[:not(:placeholder-shown)]:-translate-y-full duration-100 ">Correo</label>
            </div>
            <div className="relative group mt-6">
              <input onChange={(e) => setPassword(e.target.value)} type="password" className="bg-secondary-light outline-none p-2 w-full peer" placeholder="" required></input>
              <label className="absolute py-2 h-full left-2 pointer-events-none group-focus-within:-translate-y-full  peer-[:not(:placeholder-shown)]:-translate-y-full duration-100 ">Contraseña</label>
            </div>
            <button type="submit" className="self-center text-black bg-primary rounded hover:bg-primary-dark font-bold px-4 py-2" disabled={loading}> {loading ? "Cargando..." : "Iniciar"}</button>
            <p className="text-white">¿No tienes una cuenta? <a href="/register" className="text-primary hover:underline">Registrate aquí</a></p>
          </form>
        </div>
      </div> 
  );
}

export default Login;