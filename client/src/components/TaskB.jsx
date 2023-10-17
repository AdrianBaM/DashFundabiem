export function TaskCard({task}) {
    return (
        <div className="historial">
            <h1>{task.numeroPaciente}</h1>
            <p>{task.Dispositivo}</p>
            <p>{task.tiempo}</p>
            <p>{task.fecha}</p>
            <hr />
        </div>
    );
  }