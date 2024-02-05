import { FaEdit } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { GoBlocked } from "react-icons/go";
import useInventario from "../hooks/useInventario";

const Perfil = ({ perfil }) => {
    const { _id, nombre, descripcion, codigo, habilitado } = perfil
    const {estadoPerfil, getPerfil} = useInventario()
    const handleEstado = (id) => {
        estadoPerfil(id)
    }

    const obtenerPerfil =(id)=> {
        getPerfil(id)
    }

    return (
        <ul className='list-group'>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                {nombre} - {codigo}
                <div>
                    <button className={`btn btn-${habilitado?'success':'danger'} m-1`} onClick={()=>handleEstado(_id)}>
                        {habilitado? <FaCircleCheck />:<GoBlocked />}
                    </button>
                    <button className='btn btn-warning' onClick={() => obtenerPerfil(_id)}>
                        <FaEdit />
                    </button>
                </div>
            </li>

        </ul>
    )
}

export default Perfil