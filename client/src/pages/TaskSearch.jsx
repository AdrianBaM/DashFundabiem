import React, { useState, useEffect } from "react";
import { TasksList } from "../components/TasksList";
import { getAllTasks } from '../api/tasks.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faTachographDigital, faCalendarDays, faSearch } from '@fortawesome/free-solid-svg-icons';

export function TaskSearch() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      setTasks(res.data);
    }
    loadTasks();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.numeroPaciente.includes(searchTerm)
    );
    setFilteredTasks(filtered);
  }, [searchTerm, tasks]);

  return (
    <div className="container2">
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Buscar por número de paciente"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="task-header">
        <div><FontAwesomeIcon icon={faUser} /> Código de paciente:</div>
        <div><FontAwesomeIcon icon={faTachographDigital} /> Dispositivo:</div>
        <div><FontAwesomeIcon icon={faClock} /> Tiempo:</div>
        <div><FontAwesomeIcon icon={faCalendarDays} /> Fecha:</div>
        <div>Imprimir:</div>
      </div>
      {searchTerm.length > 0 && (
        <TasksList tasks={filteredTasks} />
      )}
    </div>
  );
}
