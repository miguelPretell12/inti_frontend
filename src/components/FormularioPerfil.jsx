import React, { useEffect, useState } from 'react'
import useInventario from '../hooks/useInventario'
import Alerta from './Alerta'


const FormularioPerfil = () => {
    const { perfil, handleChange, limpiarCampos, guardarPerfil, editarPerfil, setAlerta, alerta } = useInventario()

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([perfil.codigo, perfil.nombre, perfil.descripcion].includes('')) {
            //console.log("Completar todos los campos ")
            setAlerta({
                msg: 'Completar todos los campos',
                error: true
            })
            
        } else {
            // se elimina el atributo _id para que no cause un conflicto al momento de guardar un nuevo perfil
            setAlerta({msg:'',error:''})
            if(perfil._id =='') {
                delete perfil._id
                guardarPerfil(perfil);
            } else {
                editarPerfil(perfil)
            }
            

            limpiarCampos()
        }

        
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {alerta.error && <Alerta alerta={alerta} />}
                <input type="hidden" value={perfil._id} name='_id'/>
                <div>
                    <label htmlFor="">Código</label>
                    <input type="text" className='form-control w-50' name='codigo' value={perfil.codigo} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">Nombre de Perfil</label>
                    <input type="text" className='form-control w-50' name='nombre' value={perfil.nombre} onChange={handleChange} />
                </div>

                <div className='mb-4'>
                    <label htmlFor="">Descripcion de Perfil</label>
                    <input type="text" className='form-control w-50' name='descripcion' value={perfil.descripcion} onChange={handleChange} />
                </div>

                <div className='d-flex justify-between'>
                    <button type='submit' className='btn btn-primary' >{perfil._id == '' ? 'Guardar Perfil' : 'Editar Perfil'}</button>
                    <button type='button' className='btn btn-secondary' onClick={limpiarCampos}>Limpiar</button>
                </div>
            </form>
        </>
    )
}

export default FormularioPerfil