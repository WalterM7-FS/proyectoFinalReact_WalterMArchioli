import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '../contexts/ProfileContext';
import { toast } from 'react-toastify'; // Importamos toast

const ProfileCreate = () => {
  const [form, setForm] = useState({
    nombre: '',
    legajo: '',
    reparticion: '',
    funcion: '',
    categoria: '',
    nivelAdicionalFondoEstimulo: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { createProfile } = useProfiles();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      nombre,
      legajo,
      reparticion,
      funcion,
      categoria,
      nivelAdicionalFondoEstimulo
    } = form;

    // Validación básica
    if (!nombre || !legajo || !reparticion || !funcion || !categoria || !nivelAdicionalFondoEstimulo) {
      setError('Por favor completa todos los campos.');
      return;
    }

    const nuevoEmpleado = {
      nombre,
      legajo: Number(legajo),
      reparticion,
      funcion,
      categoria: Number(categoria),
      nivelAdicionalFondoEstimulo: Number(nivelAdicionalFondoEstimulo),
      sueldo: [],
      adicionalFondoEstimulo: {}
    };

    try {
      // Intentamos crear el perfil
      await createProfile(nuevoEmpleado);
      
      // Si todo va bien, mostramos un toast de éxito
      toast.success('Empleado creado correctamente ✅');
      navigate('/profiles'); // Redirigir a la lista de empleados
    } catch (err) {
      console.error('Error al crear:', err);
      // Si algo sale mal, mostramos un toast de error
      toast.error('Hubo un error al crear el empleado ❌');
      setError('Hubo un error al crear el empleado.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="max-w-lg w-full bg-gray-900 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Crear Nuevo Empleado</h2>

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          />
          <input
            type="number"
            name="legajo"
            placeholder="Legajo"
            value={form.legajo}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          />
          <input
            type="text"
            name="reparticion"
            placeholder="Repartición"
            value={form.reparticion}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          />
          <input
            type="text"
            name="funcion"
            placeholder="Función"
            value={form.funcion}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          />
          <input
            type="number"
            name="categoria"
            placeholder="Categoría"
            value={form.categoria}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          />
          <input
            type="number"
            name="nivelAdicionalFondoEstimulo"
            placeholder="Nivel Fondo Estímulo"
            value={form.nivelAdicionalFondoEstimulo}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-semibold"
          >
            Crear Empleado
          </button>

          <button
            type="button"
            onClick={() => navigate('/profiles')}
            className="bg-gray-600 hover:bg-gray-500 text-white py-2 rounded font-semibold"
          >
            Volver al Listado
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreate;