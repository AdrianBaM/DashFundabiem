import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';


export function TaskCard({ task }) {
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Fundabiem</title></head><body>');
    printWindow.document.write('<h2>Datos de la Terapia:</h2>');
    printWindow.document.write(`<p>Código de paciente: ${task.numeroPaciente}</p>`);
    printWindow.document.write(`<p>Dispositivo: ${getDeviceName(task.Dispositivo)}</p>`);
    printWindow.document.write(`<p>Tiempo: ${task.tiempo}</p>`);
    printWindow.document.write(`<p>Fecha: ${task.fecha}</p>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

    // Función para obtener el nombre del dispositivo basado en el ID
    const getDeviceName = (deviceID) => {
      switch (deviceID) {
        case 1:
          return "Guante Izquierdo";
        case 2:
          return "Guante Derecho";
        case 3:
          return "Rueda de Zenit";
        default:
          return "Dispositivo Desconocido";
      }
    };
  
    return (
      <div className="card2">
        <h1>{task.numeroPaciente}</h1>
        <p>{getDeviceName(task.Dispositivo)}</p>
        <p>{task.tiempo}</p>
        <p>{task.fecha}</p>
        <button onClick={handlePrint}>
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </div>
    );
  }