import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/ClienteAxios";

const InventarioContext = createContext()

const InventarioProvider = ({children}) => {
    const [perfils, setPerfils] = useState([])
    const [usuarios, setUsuarios]  = useState([])
    const [usuario, setUsuario] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const guardarUsuario = async (usuario) => {
        try {
            const {data} = await clienteAxios.post('/usuarios/crear', usuario)
            //setUsuario(data)
            setUsuarios([...usuarios, data])
            
        } catch (error) {
            console.log(error)
        }

    }

    const getPerfils = async () => {
        try {
            const {data} = await clienteAxios.get("/perfil/listar-perfil")
            setPerfils(data)
        } catch (error) {
            console.log(error)
        }        
    }

    const getUsuarios = async () => {
        try {
            const {data} = await clienteAxios.get("/usuarios/listar-usuarios")
            setUsuarios(data)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <InventarioContext.Provider 
        value={{
            handleClose,
            handleShow,
            guardarUsuario,
            getPerfils,
            getUsuarios,
            perfils,
            show,
            usuarios
        }}
    > 
        {children}
    </InventarioContext.Provider>
  )
}
export {
    InventarioProvider
}

export default InventarioContext