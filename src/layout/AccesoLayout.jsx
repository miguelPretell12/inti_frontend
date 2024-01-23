import React from 'react'
import { Outlet } from 'react-router-dom'

const AccesoLayout = () => {
  return (
    <>
        <div className='d-flex w-100 h-100v' >
                <div className='d-flex flex-column column-logo'>
                    <h3 className='titulo-login text-center'>INVENTARIO INTI</h3>
                    <img src='/img/image_login.png' className='w-100 img-login' />
                </div>
                <div className='column-login'>
                    <div className='d-header'>
                        <img src='/INTI_transparent.png' className='img-login-2' />
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
    </>
  )
}

export default AccesoLayout