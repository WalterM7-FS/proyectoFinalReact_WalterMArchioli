import { Link, Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-4xl font-bold text-green-400 mb-4">Dashboard</h1>
      <div>
        <Link to="users" className="text-green-300 hover:underline mb-2 mx-2">Users</Link>
        <Link to="settings" className="text-green-300 hover:underline mb-2 mx-2">Settings</Link>
      </div>
      <Outlet /> {/* Acá se muentran las rutas hijas */}

      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-300 mt-2"
      >
        Regresar al Inicio
      </button>
      
    </div>
  )
}

export default Dashboard