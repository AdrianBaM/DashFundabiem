import React, { useEffect, useState } from "react";
import { TasksList } from "../components/TasksList";
import { getAllTasks } from '../api/tasks.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faTachographDigital, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

export function TaskPage() {
  const tasksPerPage = 6;
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesToShow = 5;

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

  const renderPagination = () => {
    const lastPage = Math.ceil(tasks.length / tasksPerPage);
    if (lastPage <= pagesToShow) {
      return Array(lastPage)
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
        ));
    }

    let pages = [];
    if (currentPage <= Math.ceil(pagesToShow / 2)) {
      pages = Array(pagesToShow)
        .fill()
        .map((_, index) => index + 1);
    } else if (currentPage > lastPage - Math.floor(pagesToShow / 2)) {
      pages = Array(pagesToShow)
        .fill()
        .map((_, index) => lastPage - pagesToShow + index + 1);
    } else {
      pages = Array(pagesToShow)
        .fill()
        .map((_, index) => currentPage - Math.floor(pagesToShow / 2) + index);
    }

    return pages.map((page, index) => (
      <li key={index}>
        <button
          onClick={() => paginate(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      </li>
    ));
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
          <ul>{renderPagination()}</ul>
        )}
      </div>
    </div>
  );
}
