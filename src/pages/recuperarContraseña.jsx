import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clienteAxios from '../../config/ClienteAxios'

const RecuperarContraseña = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([email].includes('')) {
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
      return;
    }

    try {
      const {data} = await clienteAxios.post("/usuarios/olvide-password", {email});
      setEmail('')
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
      <h4 className='text-center fw-bold'>Recuperar Contraseña</h4>
      <form onSubmit={handleSubmit}>
        <div className='mt-3 '>
          <label htmlFor="email" className='fw-bold'>Email:</label>
          <input type="text" id='email' placeholder='Ingresa E-mail' className='form-control' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='mt-3'>
          <button type='submit' className='uppercase btn btn-login w-100'>Recuperar Contraseña</button>
        </div>
      </form>
      <Link to="/login" className='text-white text-center d-block'>¿Tienes acceso a tu cuenta ? Inicia Sesion</Link>
    </>
  )
}

export default RecuperarContraseña