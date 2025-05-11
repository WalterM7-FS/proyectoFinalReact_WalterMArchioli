import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/list');
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      console.log("Datos enviados:", data);
      // Registro del nuevo usuario
      const response = await fetch('https://proyectofinabackend-waltermarchioli.onrender.com/api/ext/agentes/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Error al registrar');
      }

      // Si el registro fue exitoso, intentar login
      const success = await login(data.email, data.password);
      if (success) {
        navigate('/list');
      } else {
        alert('Registrado correctamente, pero fallo el inicio de sesión automático.');
      }

    } catch (error) {
      console.error('Registro fallido:', error);
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6">Registrarse</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          {...formRegister('username', { required: 'Nombre de usuario requerido' })}
          placeholder="Nombre de usuario"
          className="p-2 rounded text-zinc-400"
        />
        {errors.username && <span className="text-red-500">{errors.username.message}</span>}

        <input
          {...formRegister('email', { required: 'Email requerido' })}
          type="email"
          placeholder="Correo electrónico"
          className="p-2 rounded text-zinc-400"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}

        <input
          {...formRegister('password', { required: 'Contraseña requerida' })}
          type="password"
          placeholder="Contraseña"
          className="p-2 rounded text-zinc-400"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}

        <button
          type="submit"
          className="bg-yellow-400 text-black p-2 rounded font-semibold hover:bg-yellow-500 transition"
        >
          Registrarse
        </button>
      </form>

      <p className="text-sm text-gray-300 text-center mt-4">
        ¿Ya tienes cuenta? <Link to="/login" className="text-yellow-400 hover:underline">Inicia sesión aquí</Link>
      </p>


    




    </div>
  );
};

export default Register;