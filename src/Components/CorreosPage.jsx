import React from 'react';
import CorreoForm from './CorreoForm';
import CorreoList from './CorreoList';


function CorreosPage() {
    return (
        <div>
            <h2>Gestión de Correos</h2>
            <CorreoForm />
            <CorreoList />
        </div>
    );
}

export default CorreosPage;