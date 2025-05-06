import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfiles } from '../contexts/ProfileContext';
import { toast } from 'react-toastify';

// Funciones de formato
const formatoPeriodo = (fechaStr) => {
  if (!fechaStr) return 'Sin fecha';
  const fecha = new Date(fechaStr);
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const año = fecha.getFullYear();
  return `${dia}/${mes}/${año}`;
};

const formatoMoneda = (valor) =>
  typeof valor === 'number'
    ? `$ ${valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `$ ${(parseFloat(valor) || 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ProfileEdit = () => {
  const [form, setForm] = useState({
    nombre: '',
    legajo: '',
    reparticion: '',
    funcion: '',
    categoria: '',
    nivelAdicionalFondoEstimulo: '',
    editor: '',
    sueldo: [],
    adicionalFondoEstimulo: []
  });

  const [nuevoSueldo, setNuevoSueldo] = useState({ periodo: '', haberBruto: '' });
  const [nuevoAFE, setNuevoAFE] = useState({ periodo: '', importeAFE: '' });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { profiles, updateProfile } = useProfiles();
  const { id } = useParams();

  useEffect(() => {
    const currentProfile = profiles.find((profile) => profile._id === id);
    if (currentProfile) {
      setForm({
        nombre: currentProfile.nombre || '',
        legajo: currentProfile.legajo || '',
        reparticion: currentProfile.reparticion || '',
        funcion: currentProfile.funcion || '',
        categoria: currentProfile.categoria || '',
        nivelAdicionalFondoEstimulo: currentProfile.nivelAdicionalFondoEstimulo || '',
        editor: currentProfile.editor || '',
        sueldo: currentProfile.sueldo || [],
        adicionalFondoEstimulo: Array.isArray(currentProfile.adicionalFondoEstimulo)
          ? currentProfile.adicionalFondoEstimulo
          : currentProfile.adicionalFondoEstimulo
            ? [currentProfile.adicionalFondoEstimulo]
            : []
      });
    }
  }, [profiles, id]);

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
      nivelAdicionalFondoEstimulo,
      editor
    } = form;

    if (!nombre || !legajo || !reparticion || !funcion || !categoria || !nivelAdicionalFondoEstimulo || !editor) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      const parsedForm = {
        nombre,
        legajo: Number(legajo),
        reparticion,
        funcion,
        categoria: Number(categoria),
        nivelAdicionalFondoEstimulo: Number(nivelAdicionalFondoEstimulo),
        editor: String(editor).trim(),
        sueldo: form.sueldo.map((item) => ({
          periodo: item.periodo,
          haberBruto: Number(item.haberBruto)
        })),
        adicionalFondoEstimulo: form.adicionalFondoEstimulo.map((item) => ({
          periodo: item.periodo,
          importeAFE: Number(item.importeAFE)
        }))
      };

      await updateProfile(id, parsedForm);
      toast.success('Perfil actualizado correctamente ✅');
      navigate(`/profiles/${id}`);
    } catch (err) {
      toast.error('Hubo un error al actualizar el perfil ❌');
      console.error('Error al actualizar:', err);
      setError('Hubo un error al actualizar el perfil.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <div className="max-w-4xl w-full bg-gray-900 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Editar Empleado</h2>

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Campos principales */}
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="p-2 rounded bg-gray-700 text-white" />
          <input type="number" name="legajo" placeholder="Legajo" value={form.legajo} onChange={handleChange} className="p-2 rounded bg-gray-700 text-white" />
          <input type="text" name="reparticion" placeholder="Repartición" value={form.reparticion} onChange={handleChange} className="p-2 rounded bg-gray-700 text-white" />
          <input type="text" name="funcion" placeholder="Función" value={form.funcion} onChange={handleChange} className="p-2 rounded bg-gray-700 text-white" />
          <input type="number" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} className="p-2 rounded bg-gray-700 text-white" />
          <input type="number" name="nivelAdicionalFondoEstimulo" placeholder="Nivel Fondo Estímulo" value={form.nivelAdicionalFondoEstimulo} onChange={handleChange} className="p-2 rounded bg-gray-700 text-white" />
          <input type="text" name="editor" placeholder="Editor" value={form.editor} onChange={handleChange} className="p-2 rounded bg-gray-700 text-white" />

          {/* Sueldos */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-yellow-300">Historial de Sueldos</h3>
            <table className="w-full border border-gray-600 text-sm mb-2">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border px-2 py-1">Periodo</th>
                  <th className="border px-2 py-1">Haber Bruto</th>
                  <th className="border px-2 py-1">Acción</th>
                </tr>
              </thead>
              <tbody>
                {form.sueldo.map((s, idx) => (
                  <tr key={idx} className="bg-gray-700">
                    <td className="border px-2 py-1">{formatoPeriodo(s.periodo)}</td>
                    <td className="border px-2 py-1">{formatoMoneda(s.haberBruto)}</td>
                    <td className="border px-2 py-1">
                      <button onClick={() => {
                        const nuevo = [...form.sueldo];
                        nuevo.splice(idx, 1);
                        setForm({ ...form, sueldo: nuevo });
                      }} className="text-red-400 hover:underline">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex gap-2">
              <input type="date" value={nuevoSueldo.periodo} onChange={(e) => setNuevoSueldo({ ...nuevoSueldo, periodo: e.target.value })} className="p-1 rounded bg-gray-800 text-white flex-1" />
              <input type="number" placeholder="Haber Bruto" value={nuevoSueldo.haberBruto} onChange={(e) => setNuevoSueldo({ ...nuevoSueldo, haberBruto: e.target.value })} className="p-1 rounded bg-gray-800 text-white flex-1" />
              <button type="button" onClick={() => {
                if (!nuevoSueldo.periodo || !nuevoSueldo.haberBruto) return;
                setForm({ ...form, sueldo: [...form.sueldo, { ...nuevoSueldo }] });
                setNuevoSueldo({ periodo: '', haberBruto: '' });
              }} className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white">Agregar</button>
            </div>
          </div>

          {/* Fondo Estímulo */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-blue-300">Adicional Fondo Estímulo</h3>
            <table className="w-full border border-blue-500 text-sm mb-2">
              <thead>
                <tr className="bg-blue-800">
                  <th className="border px-2 py-1">Periodo</th>
                  <th className="border px-2 py-1">Importe AFE</th>
                  <th className="border px-2 py-1">Acción</th>
                </tr>
              </thead>
              <tbody>
                {form.adicionalFondoEstimulo.map((afe, idx) => (
                  <tr key={idx} className="bg-blue-900">
                    <td className="border px-2 py-1">{formatoPeriodo(afe.periodo)}</td>
                    <td className="border px-2 py-1">{formatoMoneda(afe.importeAFE)}</td>
                    <td className="border px-2 py-1">
                      <button onClick={() => {
                        const nuevo = [...form.adicionalFondoEstimulo];
                        nuevo.splice(idx, 1);
                        setForm({ ...form, adicionalFondoEstimulo: nuevo });
                      }} className="text-red-400 hover:underline">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex gap-2">
              <input type="date" value={nuevoAFE.periodo} onChange={(e) => setNuevoAFE({ ...nuevoAFE, periodo: e.target.value })} className="p-1 rounded bg-gray-800 text-white flex-1" />
              <input type="number" placeholder="Importe AFE" value={nuevoAFE.importeAFE} onChange={(e) => setNuevoAFE({ ...nuevoAFE, importeAFE: e.target.value })} className="p-1 rounded bg-gray-800 text-white flex-1" />
              <button type="button" onClick={() => {
                if (!nuevoAFE.periodo || !nuevoAFE.importeAFE) return;
                setForm({ ...form, adicionalFondoEstimulo: [...form.adicionalFondoEstimulo, { ...nuevoAFE }] });
                setNuevoAFE({ periodo: '', importeAFE: '' });
              }} className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-white">Agregar</button>
            </div>
          </div>

          {/* Botones */}
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold">
            Guardar cambios
          </button>
          <button type="button" onClick={() => navigate(`/profiles/${id}`)} className="bg-gray-600 hover:bg-gray-700 text-white py-2 rounded font-semibold">
            Regresar al perfil
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;