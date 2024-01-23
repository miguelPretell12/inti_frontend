import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import useInventario from '../../hooks/useInventario';
import FormularioUsuario from '../../components/FormularioUsuario';
import DataTable from 'react-data-table-component'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import '../../css/style.css'

const ViewUsuarios = () => {

  const { usuarios, show, handleClose, handleShow, getUsuarios } = useInventario()

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
      selector: () => (
        <>
          <button className='btn btn-warning m-1'>
            <FaEdit />
          </button>
          <button className='btn btn-danger m-1'>
            <MdDelete />
          </button>
        </>
      )
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

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
        <DataTable
          columns={columns}
          data={usuarios}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Crear Usuario</Modal.Title>
          <button type="button" className="btn btn-close" aria-label="Close" onClick={handleClose}>X</button>
        </Modal.Header>
        <Modal.Body>
          <FormularioUsuario handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ViewUsuarios