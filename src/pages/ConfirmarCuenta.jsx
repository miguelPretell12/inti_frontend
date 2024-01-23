import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../../config/ClienteAxios';

const ConfirmarCuenta = () => {
    const params = useParams();
    const [alerta, setAlerta] = useState({})
    const { token } = params

    useEffect(() => {

        const confirmarCuenta = async () => {

            try {
                const { data } = await clienteAxios.post(`/usuarios/confirmar-cuenta/${token}`)
                
                setAlerta({
                    msg: data.msg,
                    error: false
                })
            } catch (error) {
                console.log(error)
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }

        }
        confirmarCuenta()
    }, [])

    const { error } = alerta

    return (
        <>
            <div className='p-3'>
                <h5 className='text-center fw-bold'>Confirma tu cuenta y explora las funcionalidades del Inventario INTI</h5>
                {error? (
                <>
                    <Alerta alerta={alerta} />
                </>): (
                <Link to="/login" className='uppercase btn btn-login w-100'>Iniciar Sesion</Link>)}
            </div>
        </>
    )
}

export default ConfirmarCuenta