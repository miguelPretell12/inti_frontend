import React, { useState } from 'react'


const FormularioPerfil = () => {
    const [codigo, setCodigo] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const handleSubmit = (e)=> {
        e.preventDefault()

        if([codigo, nombre, descripcion].includes('')) {
            console.log("Completar todos los campos ")
            return
        }
    }

    const limpiarCampos= () =>{
        setCodigo('')
        setDescripcion('')
        setNombre('')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Código</label>
                    <input type="text" className='form-control w-50' value={codigo} onChange={e => setCodigo(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="">Nombre de Perfil</label>
                    <input type="text" className='form-control w-50' value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>

                <div className='mb-4'>
                    <label htmlFor="">Descripcion de Perfil</label>
                    <input type="text" className='form-control w-50' value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                </div>

                <div className='d-flex justify-between'>
                    <button type='submit' className='btn btn-primary' >Guardar</button>
                    <button className='btn btn-secondary' onClick={limpiarCampos}>Limpiar</button>
                </div>
            </form>
        </>
    )
}

export default FormularioPerfil