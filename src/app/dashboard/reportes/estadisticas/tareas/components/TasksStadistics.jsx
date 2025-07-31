"use client";
import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { axioInstance } from "../../../../../utils/axioInstance";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const TaskStatistics = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: "2025-01-01",
    endDate: "2025-12-30",
  });
  const reportRef = React.useRef();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Simulando la llamada al endpoint con los filtros
        const response = await axioInstance.get(
          `/tasks?period_filters[0][column]=created_at&period_filters[0][start]=${filters.startDate}&period_filters[0][end]=${filters.endDate}`
        );
        setTasks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filters]);

  // Estadísticas básicas
  const statusStats = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const sectorStats = tasks.reduce((acc, task) => {
    acc[task.sector_display_name] = (acc[task.sector_display_name] || 0) + 1;
    return acc;
  }, {});

  const plantStats = tasks.reduce((acc, task) => {
    acc[task.plant_display_name] = (acc[task.plant_display_name] || 0) + 1;
    return acc;
  }, {});
  const handlePrintPDF = () => {
    const input = reportRef.current;

    // Ajustar el tamaño del PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    html2canvas(input, {
      scale: 2, // Aumentar la calidad
      useCORS: true, // Para permitir imágenes de origen cruzado
      allowTaint: true,
      logging: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Calcular la relación de aspecto para mantener la proporción
      const imgWidth = width - 20; // Margen izquierdo y derecho
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 10; // Margen superior inicial
      let remainingHeight = imgHeight;

      // Dividir la imagen en páginas si es demasiado alta
      while (remainingHeight > 0) {
        pdf.addImage(
          imgData,
          "PNG",
          10,
          position,
          imgWidth,
          Math.min(remainingHeight, height - 20)
        );
        remainingHeight -= height - 20;
        position -= height - 20;

        if (remainingHeight > 0) {
          pdf.addPage();
          position = 10; // Resetear posición para la nueva página
        }
      }

      pdf.save("estadisticas_tareas.pdf");
    });
  };
  // Gráfico de barras (Tareas por sector)
  const sectorChartData = {
    labels: Object.keys(sectorStats),
    datasets: [
      {
        label: "Tareas por Sector",
        data: Object.values(sectorStats),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Gráfico de pastel (Tareas por estado)
  const statusChartData = {
    labels: Object.keys(statusStats),
    datasets: [
      {
        data: Object.values(statusStats),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Gráfico de líneas (Tareas por mes)
  const monthlyStats = tasks.reduce((acc, task) => {
    const date = new Date(task.created_at);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  const monthlyChartData = {
    labels: Object.keys(monthlyStats),
    datasets: [
      {
        label: "Tareas por Mes",
        data: Object.values(monthlyStats),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center mb-0">Estadísticas de Tareas</h1>
        <button onClick={handlePrintPDF} className="btn btn-primary">
          Exportar a PDF
        </button>
      </div>

      {/* Filtros */}
      <div ref={reportRef}>
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Filtros</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">
                  Fecha de fin
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Resumen estadístico */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-header">Total de Tareas</div>
              <div className="card-body">
                <h2 className="card-title text-center">{tasks.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-info mb-3">
              <div className="card-header">Tareas por Estado</div>
              <div className="card-body">
                <ul className="list-unstyled">
                  {Object.entries(statusStats).map(([status, count]) => (
                    <li key={status}>
                      {status}: <strong>{count}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-warning mb-3">
              <div className="card-header">Tareas por Planta</div>
              <div className="card-body">
                <ul className="list-unstyled">
                  {Object.entries(plantStats).map(([plant, count]) => (
                    <li key={plant}>
                      {plant}: <strong>{count}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                Tareas por Sector
              </div>
              <div className="card-body">
                <Bar
                  data={sectorChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                Distribución por Estado
              </div>
              <div className="card-body">
                <Pie
                  data={statusChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-primary text-white">
                Tareas por Mes
              </div>
              <div className="card-body">
                <Line
                  data={monthlyChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatistics;
