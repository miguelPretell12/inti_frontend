import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/ClienteAxios";

const InventarioContext = createContext()

const InventarioProvider = ({children}) => {
    const [perfils, setPerfils] = useState([])
    const [perfil, setPerfil] = useState({
        _id:'',
        nombre:'',
        descripcion:'',
        codigo:''
    })
    const [usuarios, setUsuarios]  = useState([])
    const [usuario, setUsuario] = useState({
        _id:'',
        nombre: '',
        apellido: '',
        email:'',
        password:'',
        perfil:'',
        estado:true
        //,encargado: []
    })
    const [show, setShow] = useState(false);
    const [showColaborador, setShowColaborador] = useState(false);
    const [alerta, setAlerta] = useState({msg:'',error:false})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseColaborador = () => setShowColaborador(false);
    const handleShowColaborador = () => setShowColaborador(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfil((prevPerfil) => ({
          ...prevPerfil,
          [name]: value
        }));
    };

    const limpiarUsuario = () => {
        setUsuario({
            _id:'',
            nombre: '',
            apellido: '',
            email:'',
            password:'',
            perfil:'',
            estado:true
        })
    }

    const handleChangeUsuario = (e) => {
        const {name, value} = e.target
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]:value
        }))
    }
      
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

    const getPerfil = async (id) => {
        try {
            const {data} = await clienteAxios.get(`/perfil/obtener-perfil/${id}`)
            
            setPerfil({
                nombre: data.nombre,
                descripcion:data.descripcion,
                codigo: data.codigo,
                _id: id
            })
        } catch (error) {
            console.log(error)
        }

    }

    const limpiarCampos = () => {
        setPerfil({
            _id:'',
            nombre:'',
            descripcion:'',
            codigo:''
        })
    }

    const getUsuarios = async () => {
        try {
            const {data} = await clienteAxios.get("/usuarios/listar-usuarios")
            setUsuarios(data)
        } catch (error) {
            console.log(error)
        }
    }

    const estadoPerfil = async (id)=> {
        try {
            const {data} = await clienteAxios.post(`/perfil/estado-perfil/${id}`)
            const perfilsActualizados = perfils.map(perfilState => perfilState._id === data._id? data: perfilState)

            setPerfils(perfilsActualizados)
        } catch (error) {
            console.log(error)
        }
    }

    const guardarPerfil = async (data2) => {
        try {
            const {data} = await clienteAxios.post(`/perfil/crear-perfil`, data2)
            //setUsuario(data)
            console.log(data)
            setPerfils([...perfils, data])
        } catch (error) {
            console.log(error)
        }
    }

    const editarPerfil = async (data1) => {
        try {
            const {data} = await clienteAxios.put(`/perfil/editar-perfil/${data1._id}`, data1)
            const perfilsActualizados = perfils.map(perfilState => perfilState._id === data._id? data: perfilState)
            setPerfils(perfilsActualizados)
        } catch (error) {
            console.log(error)
        }
    }

    const getUsuario = async(id) =>{
        try {
            const {data} = await clienteAxios.get(`/usuarios/obtener-usuario/${id}`)
            setUsuario(data)
            handleShow()
        } catch (error) {
            console.log(error)
        }
    }

    const editarUsuario = async (data1) => {
        try {
            const {data} = await clienteAxios.put(`/usuarios/${data1._id}`, data1)
            const usuariosActualizados = usuarios.map(usuarioState => usuarioState._id === data._id? data: usuarioState)
            
            getUsuarios()

        } catch (error) {
            console.log(error)
        }
    }

    const handleCloseUsuario = () => {
        setUsuario({
            _id:'',
            nombre: '',
            apellido: '',
            email:'',
            password:'',
            perfil:'',
            estado:true
        })
        setShow(false)
    }

  return (
    <InventarioContext.Provider 
        value={{
            handleCloseUsuario,
            handleClose,
            handleShow,
            guardarUsuario,
            getPerfils,
            getPerfil,
            getUsuarios,
            estadoPerfil,
            handleChange,
            limpiarCampos,
            guardarPerfil,
            editarPerfil,
            setAlerta,
            getUsuario,
            handleChangeUsuario,
            limpiarUsuario,
            editarUsuario,
            handleCloseColaborador,
            handleShowColaborador,
            showColaborador,
            perfils,
            show,
            usuarios,
            perfil,
            alerta,
            usuario
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