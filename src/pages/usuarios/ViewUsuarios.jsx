import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import useInventario from '../../hooks/useInventario';
import FormularioUsuario from '../../components/FormularioUsuario';
import DataTable from 'react-data-table-component'
import { MdDelete } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import Swal from 'sweetalert2'
import '../../css/style.css'

const ViewUsuarios = () => {

  const { showColaborador, handleCloseUsuario, usuarios, show, handleClose, handleShow, getUsuarios, getUsuario, usuario, handleCloseColaborador,
    handleShowColaborador } = useInventario()
  const [buscar, setBuscar] = useState('')
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    getUsuarios()
  }, [])

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Apellido',
      selector: row => row.apellido,
      sortable: true,
    },
    {
      name: 'E-Mail',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Perfil',
      selector: row => row.perfil.nombre,
      sortable: true,
    }, 
    {
      name: "",
      selector: (row) => (
        <div style={{width:140+"px"}}>
          <button className='btn btn-warning m-1' onClick={()=>getUsuario(row._id)} >
            <FaEdit />
          </button>
          <button type='button' className='btn btn-primary m-1' onClick={()=>handleShowColaborador()}>
            <FiUserPlus />
          </button> 
        </div>
      )
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  // Se penso eliminar los usuarios, pero eso generaria un conflicto
  const handleEliminar = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted." + id,
          icon: "success"
        });
      }
    });
  }

  const handleBuscar = () => {
    if(buscar != "") {
      var filterData = usuarios.filter((usu) => {
        return (
          usu.nombre.toLowerCase().includes(buscar.toLocaleLowerCase()) || 
          usu.apellido.toLowerCase().includes(buscar.toLocaleLowerCase()) ||
          usu.email.toLowerCase().includes(buscar.toLocaleLowerCase()) ||
          usu.perfil.nombre.toLowerCase().includes(buscar.toLocaleLowerCase()) 
        )
      })
  
      setFilterData(filterData)
    }
    
  }

  return (
    <>
      <h2>Usuarios</h2>
      <div className='d-flex justify-between'>
        <button className='btn btn-primary' onClick={handleShow}>Añadir Usuario</button>
        <Link className='btn btn-green' to='/dashboard/perfils'>
          Perfil {' '}
          <FaUserShield />
        </Link>
      </div>

      <div className='content-body'>
        <input 
          type='text'
          value={buscar} 
          onChange={e => setBuscar(e.target.value)} 
          onKeyUp={handleBuscar}
          placeholder='Buscar el nombre, apellido, email o perfil'
          className='form-control mb-4 w-30'
        />
        <DataTable
          columns={columns}
          data={filterData && filterData.length? filterData : usuarios}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
        />
      </div>

      <Modal show={show} onHide={handleCloseUsuario}>
        <Modal.Header>
          <Modal.Title>{usuario._id==''?'Crear': 'Editar'}  Usuario</Modal.Title>
          <button type="button" className="btn btn-close" aria-label="Close" onClick={handleCloseUsuario}>X</button>
        </Modal.Header>
        <Modal.Body>
          <FormularioUsuario handleClose={handleCloseUsuario} />
        </Modal.Body>
      </Modal>

      <Modal show={showColaborador} onHide={handleCloseColaborador}>
        <Modal.Header>
          <Modal.Title>Colaboradores</Modal.Title>
          <button type="button" className="btn btn-close" aria-label="Close" onClick={handleCloseColaborador}>X</button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Si requieres crear un colaborador para que tenga un control en las ventas, solo crea un usuario</p>
            <hr />
            <div className='d-block'>
              <FormularioUsuario />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ViewUsuarios