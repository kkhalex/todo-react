import React from 'react';
import './Statistiche.css';
const Statistiche = ({ task, mostraStats }) => {
  const totalTask = task.length;
  const taskCompletate = task.filter((t) => t.isCompleted).length;
  const taskNonComplete = totalTask - taskCompletate;
  return (
    <div
      className='contenitore-statistiche'
      style={{
        zIndex: '1',
        position: 'relative',
        left: mostraStats ? '-250px' : '1.5rem',
      }}
    >
      <h3>
        Total task: <span>{totalTask}</span>
      </h3>
      <h4>
        Task completate: <span>{taskCompletate}</span>
      </h4>
      <h4>
        Task non completate: <span>{taskNonComplete}</span>
      </h4>
    </div>
  );
};

export default Statistiche;
