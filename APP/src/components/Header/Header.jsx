import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

  const deleteToken = () => {
    // Eliminar el token del sessionStorage
    sessionStorage.removeItem('token');
    // Redirigir al usuario a la página login
    navigate('/login', { replace: true }); // 'replace: true' para no dejar la página protegida en el historial
  }

  return (

    <div className="d-flex flex-column text-center">

        <h1 className='text-center'>COWABUNGA!</h1>

        <button className='btn btn-outline-success' onClick={() => navigate('/wastestore')}>
            Residuos Almacenados
        </button>

        <button className='btn btn-outline-info' onClick={() => navigate('/searchwaste')}>
            Buscar Residuos
        </button>

        <button className='btn btn-outline-warning' onClick={deleteToken}>⚠️ Cerrar sesión ⚠️</button>


    </div>
        

  )
}