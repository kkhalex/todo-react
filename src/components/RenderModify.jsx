import React, { useState } from 'react';
import './AddForm.css';
const RenderModify = ({ updateTask, task }) => {
  const [nuovoTesto, setNuovoTesto] = useState('');

  const handleUpdate = () => {
    if (nuovoTesto !== '') {
      updateTask(task.id, nuovoTesto);
    }
  };
  return (
    <div
      className='modify-task'
      style={{
        height: '30px',
      }}
    >
      <input
        placeholder={task.task}
        type='text'
        style={{
          height: '25px',
          borderRadius: '7px',
          paddingLeft: '15px',
          fontSize: '15px',
          backgroundColor: '#e0e1dd',
          color: 'black',
        }}
        onChange={(e) => setNuovoTesto(e.target.value)}
      />
      <button
        style={{
          color: 'black',
          fontSize: '22px',
          fontWeight: '600',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
        onClick={handleUpdate}
      >
        <i className='fa-regular fa-floppy-disk'></i>
      </button>
    </div>
  );
};

export default RenderModify;
