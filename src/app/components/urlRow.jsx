import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UrlRow({ breadcrumbs }) {
  return (
    <div className="container-fluid" style={{ margin: '0', padding: '0 0' }}>
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol
              className=""
              style={{
                padding: '0px 15px', // Reducir padding
                borderRadius: '5px',
                margin: '0px 10px',
                listStyle: 'none',
                fontSize: '16px', // Tamaño de fuente más pequeño
              }}
            >
              {breadcrumbs.map((breadcrumb, index) => (
                <li
                  key={index}
                  className={`${index === breadcrumbs.length - 1 ? 'active' : ''}`}
                  aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                  style={{
                    display: 'inline',
                    color: index === breadcrumbs.length - 1 ? '#6c757d' : '#007bff',
                  }}
                >
                  {index !== breadcrumbs.length - 1 ? (
                    <>
                      <a href={breadcrumb.link} className="text-decoration-none text-muted">{breadcrumb.label}</a>
                      <span className="mx-1" style={{ color: '#6c757d' }}> &gt; </span> {/* Menor espacio entre items */}
                    </>
                  ) : (
                    breadcrumb.label
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
      <hr style={{ margin: '0 0',padding:
       '0 0',
       width:'100%'
       
       }} /> {/* Reducir el margen del separador */}
    </div>
  );
}

export default UrlRow;
