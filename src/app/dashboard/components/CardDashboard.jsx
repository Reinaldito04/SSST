
function CardDashboard({ title, subtitle, icon, variant = 'primary', ruta }) {
  const variantClasses = {
    primary: 'bg-primary text-white',
    success: 'bg-success text-white',
    info: 'bg-info text-dark',
    warning: 'bg-warning text-dark',
    danger: 'bg-danger text-white'
  };

  return (
    <div className={`card h-100 border-0 shadow-sm transition-all ${variantClasses[variant]}`}>
      <div className="card-body text-center p-3">
        <div className="mb-2">{icon}</div>
        <h3 className="h4 mb-1">{title}</h3>
        <p className="mb-2 small opacity-75">{subtitle}</p>
        {ruta && (
          <a href={ruta} className="text-white stretched-link small">
            Ver detalles
          </a>
        )}
      </div>
    </div>
  );
}