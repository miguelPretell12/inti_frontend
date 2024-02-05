import React, { useEffect } from 'react'
import FormularioPerfil from '../../components/FormularioPerfil'
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import useInventario from '../../hooks/useInventario';
import Perfil from '../../components/Perfil';

const ViewPerfil = () => {
    const {perfils,getPerfils} = useInventario()

    useEffect(()=>{
        getPerfils()
    },[])

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
                {perfils.length? perfils.map(perfil => (<Perfil key={perfil._id} perfil={perfil}/>)): <h3>No hay Perfiles registrados</h3>}
                    
                </div>
            </div>
        </>
    )
}

export default ViewPerfil