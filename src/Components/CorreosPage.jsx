import React from 'react';
import CorreoForm from './CorreoForm';
import CorreoList from './CorreoList';

function CorreosPage({ onCorreoAgregado, actualizar }) {
    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Gestión de Correos</h2>
                <CorreoForm onCorreoAgregado={onCorreoAgregado} />
                <CorreoList actualizar={actualizar} />
            </div>
        </div>
    );
}

export default CorreosPage;





