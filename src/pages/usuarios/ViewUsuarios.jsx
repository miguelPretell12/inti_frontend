import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import useInventario from '../../hooks/useInventario';
import FormularioUsuario from '../../components/FormularioUsuario';
import DataTable from 'react-data-table-component'
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FiUserPlus } from "react-icons/fi";
import { FaCheck, FaEdit, FaRegCheckCircle } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import Swal from 'sweetalert2'
import '../../css/style.css'

const ViewUsuarios = () => {

  const {
    showVisColaborador,
    handleCloseVisColaborador,
    handleShowVisColaborador,
    obtenerColaboradores,
    colaboradores,
    showColaborador, handleCloseUsuario, usuarios, show, handleClose, handleShow, getUsuarios, getUsuario, usuario, handleCloseColaborador,
    handleShowColaborador } = useInventario()
  const [buscar, setBuscar] = useState('')
  const [supervisor, setSupervisor] = useState('')
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    getUsuarios()
  }, [])

  const handleShowColaCrear = (idsupervisor) => {
    handleShowColaborador()
    setSupervisor(idsupervisor)
  }

  const handleShowVisColaboradorModal = (id) => {
    obtenerColaboradores(id)
    handleShowVisColaborador()
  }

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
        <div style={{ width: 350 + "px" }}>
          <button className='btn btn-warning m-1' onClick={() => getUsuario(row._id)} >
            <FaEdit />
          </button>
          <button type='button' className='btn btn-primary m-1' onClick={() => handleShowColaCrear(row._id)}>
            <FiUserPlus />
          </button>
          <button type='button' className='btn btn-success m-1' onClick={() => handleShowVisColaboradorModal(row._id)}>
            <HiMiniUserGroup />
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

  const handleBuscar = () => {
    if (buscar != "") {
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
          data={filterData && filterData.length ? filterData : usuarios}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
        />
      </div>

      <Modal show={show} onHide={handleCloseUsuario}>
        <Modal.Header>
          <Modal.Title>{usuario._id == '' ? 'Crear' : 'Editar'}  Usuario</Modal.Title>
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
              <FormularioUsuario tipo={1} supervisor={supervisor} />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showVisColaborador} onHide={handleCloseVisColaborador}>
        <Modal.Header>
          <Modal.Title>Colaboradores</Modal.Title>
          <button type="button" className="btn btn-close" aria-label="Close" onClick={handleCloseVisColaborador}>X</button>
        </Modal.Header>
        <Modal.Body>

          <ol className="list-group list-group-numbered">
            {
              colaboradores.length?(
              colaboradores.map(colaborador => (
                <li className="list-group-item d-flex justify-content-between align-items-start" key={colaborador._id}>
                  <div className='ms-2 me-auto'>
                    <div className='fw-bold'>{colaborador.nombre} {colaborador.apellido}</div>
                    E-mail: {colaborador.email} - Perfil: {colaborador.perfil.nombre}
                  </div>
                  <span className={`badge bg-${colaborador.estado?'success':'danger'} rounded-pill text-white`}>{colaborador.estado? <FaCheck />: <MdOutlineCancel /> }</span>
                </li>
              ))
              ) : <p>No hay colaboradores asignados</p>
            }
          </ol>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ViewUsuarios