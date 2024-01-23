import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import clienteAxios from '../../config/ClienteAxios';
import Alerta from '../components/Alerta'
import 'react-toastify/dist/ReactToastify.css';

const ConfirmarContraseña = () => {
    const params = useParams();
    const {token} = params
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const navigate = useNavigate()
    
    useEffect(()=> {
        
        const comprobarToken = async () => {
            try {
                
                await clienteAxios.get(`/usuarios/verificar-token/${token}`)
                setTokenValido(true)
            } catch (error) {
                console.log(error.response.data.msg)
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password.length < 6) {
            toast.error("El password debe ser minimo de 6 caracteres", {
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
            const url = `/usuarios/recuperar-password/${token}`
            const {data} = await clienteAxios.post(url, {password})
            setPassword("")
            toast.success(data.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            
            setTimeout(() => {
                navigate('/login');
            }, 3500);
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

    const {msg} = alerta

    return (
        <>
        <ToastContainer />
            <h4 className='text-center fw-bold'>Reestablece tu Contraseña</h4>
            {msg && (<>
                <Alerta alerta={alerta} />
            <Link to="/login" className='text-white text-center d-block'>¿Tienes acceso a tu cuenta ? Inicia Sesion</Link>
            </>
            )}
            {tokenValido && (<form onSubmit={handleSubmit} className='p-1'>
                <div className='mt-3 '>
                    <label htmlFor="password" className='fw-bold'>Nueva Contraseña:</label>
                    <input
                        type="password"
                        id='password'
                        placeholder='Ingresa tu nueva contraseña'
                        className='form-control'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className='mt-3'>
                    <button type='submit' className='uppercase btn btn-login w-100'>Guardar nueva Contraseña</button>
                </div>
            </form>)}
        </>
    )
}

export default ConfirmarContraseña