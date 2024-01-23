import React, { useState } from 'react'
import '../css/Login.css'
import clienteAxios from '../../config/ClienteAxios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([email, contrasenia].includes('')) {
            toast.error("Todos los campos son obligatorios", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }

        try {
            const { data } = await clienteAxios.post("/usuarios/login", { email, password: contrasenia })

            toast.success(`Accedio Correctamente, Bienvenido ${data.nombre} ${data.apellido}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            toast.error(error.response.data.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <>
            <ToastContainer />
            <h4 className='text-center fw-bold'>Iniciar Sesion</h4>
            <form onSubmit={handleSubmit}>
                <div className='mt-3 '>
                    <label htmlFor="email" className='fw-bold'>Email:</label>
                    <input type="text" id='email' className='form-control' onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className='mt-3'>
                    <label htmlFor="contrasenia" className='fw-bold'>Contraseña:</label>
                    <input type="password" id="contrasenia" className='form-control' onChange={(e) => setContrasenia(e.target.value)} value={contrasenia} />
                </div>
                <div className='mt-3'>
                    <button className='uppercase btn btn-login w-100'>INGRESAR</button>
                </div>
                <Link to="/olvide-password" className='text-white text-center d-block'>¿Recuperar tu contraseña?</Link>
            </form>
        </>
    )
}

export default Login