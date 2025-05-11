import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/list');
    }
  }, [user]);

  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);
    if (success) {
      navigate('/list');
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6">Iniciar sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          {...register('email', { required: 'Email requerido' })}
          type="email"
          placeholder="Correo electrónico"
          className="p-2 rounded text-zinc-400"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}

        <input
          {...register('password', { required: 'Contraseña requerida' })}
          type="password"
          placeholder="Contraseña"
          className="p-2 rounded text-zinc-400"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}

        <button
          type="submit"
          className="bg-yellow-400 text-black p-2 rounded font-semibold hover:bg-yellow-500 transition"
        >
          Iniciar sesión
        </button>

        <p className="text-sm text-gray-300 text-center">
            ¿No tienes cuenta? <Link to="/register" className="text-yellow-400 hover:underline">Regístrate aquí</Link>
        </p>

      </form>

      <h1>Usuario:Administrador email:administrador@nodo.com, password: 777 token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjBiMjFjZmRlNGFjZDZmOTkzNDFmMCIsInJvbGUiOiI2ODE5ODhiNThkZTY2NGZkMjhkYjBlODUiLCJpYXQiOjE3NDY5NzQyMjMsImV4cCI6MTc0NzA2MDYyM30.KuTREWlodzjVcFMbDo_8YfANpitD6vqmaKNX5zeCLcA</h1>
      <h1> Usuario:Editor email:editor@nodo.com password: 888 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjBiMjFkZmRlNGFjZDZmOTkzNDFmNCIsInJvbGUiOiI2ODE5ODhiNThkZTY2NGZkMjhkYjBlODQiLCJpYXQiOjE3NDY5NzQ1NjIsImV4cCI6MTc0NzA2MDk2Mn0.EKWwQZOUFb6UbMfHshsTl-Jr6PZIva9ZpSLK2zJZrVk</h1>
      

    </div>
  );
};

export default Login;