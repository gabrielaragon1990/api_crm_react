import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente';

function Inicio() {

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        console.log(import.meta.env);
        const response = await fetch(url);
        const result = await response.json();

        setClientes(result);
      } catch (error) {
        console.log(error);
      }
    }

    obtenerClientesAPI();
  }, []);

  const handleEliminar = async id => {
    if (confirm('¿Deseas eliminar este cliente?')) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await fetch(url, { method: 'DELETE' });

        await response.json();

        setClientes(clientes.filter(
          cliente => cliente.id !== id
        ));
      } catch(error) {
        console.log(error);
        alert(error);
      }
    }
  };

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>
        Clientes
      </h1>
      <p className='mt-5'>
        Administra tus clientes
      </p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map(cliente => (
              <Cliente
                key={cliente.id}
                cliente={cliente}
                handleEliminar={handleEliminar}
              />
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Inicio