import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useInventario from '../hooks/useInventario';

const FormularioUsuario = ({ tipo = 0, supervisor="" }) => {
    const {handleCloseColaborador,guardarUsuarioColaborador, handleCloseUsuario,editarUsuario, limpiarUsuario, usuario,guardarUsuario, getPerfils,perfils, handleClose, handleChangeUsuario } = useInventario()
    useEffect(()=> {
        getPerfils()
    },[])

    const {_id, nombre, apellido, email, password, perfil, estado} = usuario

    const handleSubmit = (e) => {
        e.preventDefault()

        if(tipo == 0) {
            if(_id == '') {
                delete usuario._id
                guardarUsuario(usuario)
            } else {
                editarUsuario(usuario)
            }
            
            // limpiar campo despues de guardar
            limpiarUsuario()
            // Cerrar modal
            handleClose()
        }
        if(tipo == 1){
            usuario.supervisor = supervisor            
            delete usuario._id
            guardarUsuarioColaborador(usuario)

            limpiarUsuario()
            handleCloseColaborador()
        }
    }

    const perfilesFiltrados = tipo === 1 ? perfils.filter(perfil => perfil.codigo !== 'ADMIN' && perfil.habilitado === true) : perfils.filter(perfil => perfil.habilitado === true);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="nombres">Nombres:</label>
                    <input type="text" className='form-control' name='nombre' onChange={handleChangeUsuario} value={nombre} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="apellido">Apellidos:</label>
                    <input type="text" className='form-control' name='apellido' onChange={handleChangeUsuario} value={apellido} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" className='form-control' name='email' onChange={handleChangeUsuario} value={email} />
                </div>
                <div className={`${_id==''?'d-block':'d-none' } mb-3`}>
                    <label htmlFor="contrasenia">Contraseña:</label>
                    <input type="password" className='form-control' name='password' onChange={handleChangeUsuario} value={password} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="">Perfil:</label>
                    <select  className='form-control'
                        name='perfil'
                        onChange={handleChangeUsuario}
                        value={perfil}
                    >
                        <option value="">--seleccionar--</option>
                        {
                            perfilesFiltrados.map(perfil => (<option key={perfil._id} value={perfil._id}>{perfil.nombre}</option>))
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="">Estado:</label>
                    <select className='form-control'
                        onChange={handleChangeUsuario}
                        value={estado? '1':'0'}
                        name='estado'
                    >
                        <option value="">--seleccionar--</option>
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                </div>
                <div className='modal-footer'>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={handleCloseUsuario}
                    >
                        Cerrar    
                    </button>  
                    <button 
                        type='submit'
                        className='btn btn-primary'
                    >
                        {_id==''?'Guardar Usuario':'Editar Usuario'}
                    </button>  
                </div>
            </form>
        </>
    )
}

export default FormularioUsuario