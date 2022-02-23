import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from "../components/Formulario"

function EditarCliente() {

  const [cliente, setCliente] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const response = await fetch(url);
        const result = await response.json();

        setCliente(result);
      } catch (error) {
        console.log(error);
      }
      setLoading(!loading);
    };
    obtenerClienteAPI();
  }, []);

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>
        Editar Cliente
      </h1>
      <p className='mt-5'>
        Utiliza este formulario para editar datos de un cliente
      </p>

      {
        cliente?.nombre ? (
          <Formulario
            cliente={cliente}
            loading={loading}
          />
        ) : (
          <p className='mt-10 text-center font-bold text-xl text-gray-700'>
            ID de Cliente Inválido
          </p>
        )
      }
    </>
  )
}

export default EditarCliente