import { useForm } from 'react-hook-form';
import { createTask } from '../api/tasks.api';
import { useNavigate } from 'react-router-dom';

export function TaskFormPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    console.log('Datos a enviar:', data); // Agrega el console.log aquí para ver los datos antes de enviarlos
    await createTask(data);
    navigate("/tasks");
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Número de paciente"
          {...register("numeroPaciente", { required: true })}
        />
        {errors.numeroPaciente && <span>This field is required</span>}

        <input
          type="number"
          placeholder="Dispositivo"
          {...register("Dispositivo", { required: true })}
        />
        {errors.Dispositivo && <span>This field is required</span>}

        <input
          type="date"
          placeholder="Fecha"
          {...register("fecha", { required: true })}
        />
        {errors.fecha && <span>This field is required</span>}

        <input
          type="text"
          placeholder="Tiempo"
          {...register("tiempo", { required: true })}
        />
        {errors.tiempo && <span>This field is required</span>}

        <button>Save</button>
      </form>
    </div>
  );
}
