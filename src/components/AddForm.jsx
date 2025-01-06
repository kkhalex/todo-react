import React, { useState } from 'react';
import './AddForm.css';
const AddForm = ({ addTask }) => {
  const [testo, setTesto] = useState('');

  const handleSubmit = () => {
    addTask(testo);
    setTesto('');
  };
  return (
    <div className='add-form'>
      <input
        type='text'
        placeholder='Aggiungi una task'
        value={testo}
        onChange={(e) => setTesto(e.target.value)}
      />
      <button onClick={handleSubmit}>ADD</button>
    </div>
  );
};

export default AddForm;
