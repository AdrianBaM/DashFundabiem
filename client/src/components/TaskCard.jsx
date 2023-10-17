export function TaskCard({ task }) {
    // Función para obtener el nombre del dispositivo basado en el ID
    const getDeviceName = (deviceID) => {
      switch (deviceID) {
        case 7:
          return "Guante Izquierdo";
        case 8:
          return "Guante Derecho";
        case 9:
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
      </div>
    );
  }