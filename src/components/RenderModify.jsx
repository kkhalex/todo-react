import React, { useState } from 'react';

const RenderModify = ({ updateTask, task }) => {
  const [nuovoTesto, setNuovoTesto] = useState('');

  const handleUpdate = () => {
    if (nuovoTesto !== '') {
      console.log(task.id);
      updateTask(task.id, nuovoTesto);
    }
  };
  return (
    <div>
      <input
        placeholder={task.task}
        type='text'
        onChange={(e) => setNuovoTesto(e.target.value)}
      />
      <button onClick={handleUpdate}>S</button>
    </div>
  );
};

export default RenderModify;
