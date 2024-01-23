import React from 'react'
import FormularioPerfil from '../../components/FormularioPerfil'
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const ViewPerfil = () => {
    return (
        <>
            <Link to="/dashboard/usuarios" className='icon-font btn btn-primary' >
                <IoMdArrowRoundBack />
            </Link>
            <h2>Perfil</h2>

            <div className='d-grid grid-column-2'>
                <div>
                    <FormularioPerfil />
                </div>
                <div className='content-body'>
                    <h3>No hay Perfiles registrados</h3>
                </div>
            </div>
        </>
    )
}

export default ViewPerfil