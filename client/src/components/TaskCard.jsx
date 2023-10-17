export function TaskCard({ task }) {
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
      </div>
    );
  }