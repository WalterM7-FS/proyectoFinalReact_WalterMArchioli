import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfiles } from '../contexts/ProfileContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ProfileDetail = () => {
  const { id } = useParams();
  const { profiles, deleteProfile } = useProfiles();
  const navigate = useNavigate();

  const profile = profiles.find((p) => p._id === id);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#FF0000',
      cancelButtonText: 'Cancelar',
      draggable: true
    });

    if (result.isConfirmed) {
      try {
        await deleteProfile(id);
        toast.success('Empleado eliminado exitosamente');
        navigate('/profiles');
      } catch (err) {
        toast.error('Error al eliminar el empleado');
        console.error('Error:', err);
      }
    }
  };

  if (!profile) return <p className="text-center mt-10 text-xl">Empleado no encontrado 😿</p>;

  const formatoPeriodo = (fechaStr) => {
    if (!fechaStr) return 'Sin fecha';
    const fecha = new Date(fechaStr);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const formatoMoneda = (valor) =>
    typeof valor === 'number' ? `$ ${valor.toLocaleString('es-AR')}` : 'Sin monto';

  const sueldosOrdenados = [...(profile.sueldo || [])].sort((a, b) =>
    new Date(b.periodo) - new Date(a.periodo)
  );

  const adicional = profile.adicionalFondoEstimulo;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg text-center">
      <h1 className="text-3xl font-bold mb-2">{profile.nombre}</h1>
      <p className="text-gray-600 mb-1">Legajo: <strong>{profile.legajo}</strong></p>
      <p className="text-gray-600 mb-1">Repartición: <strong>{profile.reparticion}</strong></p>
      <p className="text-gray-600 mb-1">Función: <strong>{profile.funcion}</strong></p>
      <p className="text-gray-600 mb-1">Categoría: <strong>{profile.categoria}</strong></p>
      <p className="text-gray-600 mb-4">
        Nivel Fondo Estímulo: <strong>{profile.nivelAdicionalFondoEstimulo}</strong>
      </p>

      {/* Tabla de sueldos */}
      <div className="bg-gray-100 rounded-md p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Historial de Sueldos</h2>
        {sueldosOrdenados.length > 0 ? (
          <table className="w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border border-gray-300">Periodo</th>
                <th className="px-4 py-2 border border-gray-300">Haber Bruto</th>
              </tr>
            </thead>
            <tbody>
              {sueldosOrdenados.map((sueldo, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{formatoPeriodo(sueldo.periodo)}</td>
                  <td className="px-4 py-2 border border-gray-300">{formatoMoneda(sueldo.haberBruto)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay sueldos registrados</p>
        )}
      </div>

      <div className="bg-blue-50 rounded-md p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-900">Adicional Fondo Estímulo</h2>
        {Array.isArray(profile.adicionalFondoEstimulo) && profile.adicionalFondoEstimulo.length > 0 ? (
          <table className="w-full table-auto border border-blue-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="px-4 py-2 border border-blue-300">Periodo</th>
                <th className="px-4 py-2 border border-blue-300">Importe AFE</th>
              </tr>
            </thead>
            <tbody>
              {profile.adicionalFondoEstimulo.map((afe, index) => (
                <tr key={index} className="bg-white hover:bg-blue-50">
                  <td className="px-4 py-2 border border-blue-300">{formatoPeriodo(afe.periodo)}</td>
                  <td className="px-4 py-2 border border-blue-300">{formatoMoneda(afe.importeAFE)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No hay datos registrados</p>
        )}
      </div>
      
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <button
          onClick={() => navigate('/profiles')}
          className="px-6 py-2 font-semibold text-white bg-gray-800 hover:bg-gray-700 rounded-lg"
        >
          Regresar al Listado
        </button>
        <button
          onClick={() => navigate(`/profiles/${profile._id}/edit/`)}
          className="px-6 py-2 font-semibold text-white bg-blue-800 hover:bg-blue-700 rounded-lg"
        >
          Editar Empleado
        </button>
        <button
          onClick={handleDelete}
          className="px-6 py-2 font-semibold text-white bg-red-800 hover:bg-red-700 rounded-lg"
        >
          Eliminar de la lista
        </button>
      </div>
    </div>
  );
};

export default ProfileDetail;