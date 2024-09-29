import React from 'react';

function CardDashboard() {
  return (
    <div className="card" style={{ width: '22rem',
        boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        backgroundColor: '#f8f9fa',

     }}>
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">Numero de Administradores</h5>
        <div className="d-flex flex-column ">
          <h1 className="display-3 fw-bolder mb-0">42</h1>
          <p className="text-muted">Administradores registrados</p>
        </div>
      </div>
    </div>
  );
}

export default CardDashboard;
