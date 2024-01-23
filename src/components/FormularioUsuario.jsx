import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useInventario from '../hooks/useInventario';

const FormularioUsuario = ({  }) => {
    const { guardarUsuario, getPerfils,perfils, handleClose } = useInventario()
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [perfil, setPerfil] = useState('')
    const [estado, setEstado] = useState(true)

    useEffect(()=> {
        getPerfils()
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        guardarUsuario({
            nombre
            , apellido
            , email
            , password
            , perfil
            , estado
        })

        // limpiar campo despues de guardar
        setNombre('')
        setApellido('')
        setPassword('')
        setPerfil('')
        setEstado('')
        setEstado('')

        // Cerrar modal
        handleClose()
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="nombres">Nombres:</label>
                    <input type="text" className='form-control' onChange={(e) => setNombre(e.target.value)} value={nombre} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="apellido">Apellidos:</label>
                    <input type="text" className='form-control' onChange={(e) => setApellido(e.target.value)} value={apellido} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" className='form-control' onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="contrasenia">Contraseña:</label>
                    <input type="password" className='form-control' onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="">Perfil:</label>
                    <select  className='form-control'
                        onChange={e => setPerfil(e.target.value)}
                        value={perfil}
                    >
                        <option value="">--seleccionar--</option>
                        {
                            perfils.map(perfil => <option key={perfil._id} value={perfil._id}>{perfil.nombre}</option>)
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="">Estado:</label>
                    <select className='form-control'
                        onChange={e => setEstado(e.target.value)}
                        value={estado}
                    >
                        <option value="">--seleccionar--</option>
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                </div>
                <div className='modal-footer'>
                    <button
                        className='btn btn-secondary'
                        onClick={handleClose}
                    >
                        Cerrar    
                    </button>  
                    <button 
                        type='submit'
                        className='btn btn-primary'
                    >
                        Guardar
                    </button>  
                </div>
            </form>
        </>
    )
}

export default FormularioUsuario