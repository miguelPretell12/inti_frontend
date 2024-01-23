import React from 'react'

const Alerta = ({alerta}) => {
    const {msg, error} = alerta
    return (
        <>
            <div  className={`text-center fw-bold  alert alert-${error? 'danger':'succes'}`} role='alert'>
                {msg}
            </div>
        </>
    )
}

export default Alerta