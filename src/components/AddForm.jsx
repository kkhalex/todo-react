import React, { useState } from 'react';

const AddForm = ({ addTask }) => {
  const [testo, setTesto] = useState('');

  const handleSubmit = () => {
    addTask(testo);
  };
  return (
    <div className='add-form'>
      <input
        type='text'
        value={testo}
        onChange={(e) => setTesto(e.target.value)}
      />
      <button onClick={handleSubmit}>ADD</button>
    </div>
  );
};

export default AddForm;
