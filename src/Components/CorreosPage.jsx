
import React from 'react';
import CorreoForm from './CorreoForm';
import CorreoList from './CorreoList';

function CorreosPage({ onCorreoAgregado, actualizar }) {
    return (
        <div>
            <h2>Gestión de Correos</h2>
            <CorreoForm onCorreoAgregado={onCorreoAgregado} />
            <CorreoList actualizar={actualizar} />
        </div>
    );
}

export default CorreosPage;




