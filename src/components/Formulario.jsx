import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta';
import Loading from './Loading';

function Formulario({
    cliente,
    loading
}) {

    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('El Nombre del Cliente es obligatorio')
            .min(3, 'El nombre es muy corto')
            .max(20, 'El nombre es muy largo'),
        empresa: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
            .email('Email no válido')
            .required('El email es obligatorio'),
        telefono: Yup.number()
            .integer('Número no válido')
            .positive('Número no válido')
            .typeError('Número no válido')
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            let response;
            if (cliente?.id) {
                //Editar registro
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                //Nuevo registro
                const url = 'http://localhost:4000/clientes';
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            await response.json();

            resetForm();
            navigate('/clientes');
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    return loading ? <Loading /> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
            </h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}
                enableReinitialize={true}
                onSubmit={handleSubmit}
                validationSchema={nuevoClienteSchema}
            >
                {({ errors, touched }) => {
                    return (
                        <Form className='mt-10'>

                            <div className='mb-4'>
                                <label
                                    htmlFor="nombre"
                                    className='text-gray-800'
                                >Nombre: {''}</label>
                                <Field
                                    id='nombre'
                                    type='text'
                                    className='mt-2 block w-full p-3 bg-gray-50 border-gray-200 border-2'
                                    placeholder='Nombre del Cliente'
                                    name='nombre'
                                />
                                {
                                    errors.nombre && touched.nombre && (
                                        <Alerta>{errors.nombre}</Alerta>
                                    )
                                }
                            </div>

                            <div className='mb-4'>
                                <label
                                    htmlFor="empresa"
                                    className='text-gray-800'
                                >Empresa: {''}</label>
                                <Field
                                    id='empresa'
                                    type='text'
                                    className='mt-2 block w-full p-3 bg-gray-50 border-gray-200 border-2'
                                    placeholder='Empresa'
                                    name='empresa'
                                />
                                {
                                    errors.empresa && touched.empresa && (
                                        <Alerta>{errors.empresa}</Alerta>
                                    )
                                }
                            </div>

                            <div className='mb-4'>
                                <label
                                    htmlFor="email"
                                    className='text-gray-800'
                                >Email: {''}</label>
                                <Field
                                    id='email'
                                    type='email'
                                    className='mt-2 block w-full p-3 bg-gray-50 border-gray-200 border-2'
                                    placeholder='Email'
                                    name='email'
                                />
                                {
                                    errors.email && touched.email && (
                                        <Alerta>{errors.email}</Alerta>
                                    )
                                }
                            </div>

                            <div className='mb-4'>
                                <label
                                    htmlFor="telefono"
                                    className='text-gray-800'
                                >Teléfono: {''}</label>
                                <Field
                                    id='telefono'
                                    type='tel'
                                    className='mt-2 block w-full p-3 bg-gray-50 border-gray-200 border-2'
                                    placeholder='Teléfono'
                                    name='telefono'
                                />
                                {
                                    errors.telefono && touched.telefono && (
                                        <Alerta>{errors.telefono}</Alerta>
                                    )
                                }
                            </div>

                            <div className='mb-4'>
                                <label
                                    htmlFor="notas"
                                    className='text-gray-800'
                                >Notas: {''}</label>
                                <Field
                                    as="textarea"
                                    id='notas'
                                    type='text'
                                    className='mt-2 block w-full p-3 bg-gray-50 border-gray-200 border-2 h-40'
                                    placeholder='Notas'
                                    name='notas'
                                />
                            </div>

                            <input
                                type='submit'
                                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                            />

                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

Formulario.defaultProps = {
    loading: false
}

export default Formulario