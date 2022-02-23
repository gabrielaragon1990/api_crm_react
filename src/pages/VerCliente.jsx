import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';

function VerCliente() {

    const [cliente, setCliente] = useState({});
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const response = await fetch(url);
                const result = await response.json();

                setCliente(result);
            } catch (error) {
                setCliente({});
                console.log(error);
            }
            setLoading(!loading);
        }
        obtenerClienteAPI();
    }, []);

    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : Object.keys(cliente).length === 0 ? (
                    <p className='text-center font-bold text-xl text-gray-700'>No hay resultados</p>
                ) : (
                    <>
                        <h1 className='font-black text-4xl text-blue-900'>
                            Detalle del Cliente:
                        </h1>

                        <div className='py-5 px-10 mt-10 border-2 border-gray-300 rounded-md shadow-xl'>
                            <p className='mt-5 pb-3 font-bold text-4xl text-center text-blue-700 border-b-2 border-gray-300'>
                                {cliente.nombre}
                            </p>

                            <p className='text-2xl text-gray-600 mt-4'>
                                <span className='text-gray-800 uppercase font-bold'>Email: </span>
                                {cliente.email}
                            </p>

                            {
                                cliente.telefono && (
                                    <p className='text-2xl text-gray-600 mt-4'>
                                        <span className='text-gray-800 uppercase font-bold'>Teléfono: </span>
                                        {cliente.telefono}
                                    </p>
                                )
                            }

                            <p className='text-2xl text-gray-600 mt-4'>
                                <span className='text-gray-800 uppercase font-bold'>Empresa: </span>
                                {cliente.empresa}
                            </p>

                            {
                                cliente.notas && (
                                    <p className='text-2xl text-gray-600 mt-4 mb-4'>
                                        <span className='text-gray-800 uppercase font-bold'>Notas: </span>
                                        {cliente.notas}
                                    </p>
                                )
                            }
                        </div>
                    </>
                )
            }


        </>
    )
}

export default VerCliente