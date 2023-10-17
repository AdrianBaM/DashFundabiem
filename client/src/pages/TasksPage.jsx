import React, { useEffect, useState } from "react";
import { TasksList } from "../components/TasksList";
import { getAllTasks } from '../api/tasks.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faTachographDigital, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

export function TaskPage() {
  const tasksPerPage = 6;
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      setTasks(res.data);
    }
    loadTasks();
  }, []);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container2">
        <div className="task-header">
          <div><FontAwesomeIcon icon={faUser} /> Código de paciente:</div>
          <div><FontAwesomeIcon icon={faTachographDigital} /> Dispositivo:</div>
          <div><FontAwesomeIcon icon={faClock} /> Tiempo:</div>
          <div><FontAwesomeIcon icon={faCalendarDays} /> Fecha:</div>
          <div>Imprimir:</div>
        </div>
      <TasksList tasks={currentTasks} />
      <div className="pagination">
        {tasks.length > tasksPerPage && (
          <ul>
            {Array(Math.ceil(tasks.length / tasksPerPage))
              .fill()
              .map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
