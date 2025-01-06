import React, { useState } from 'react';
import './AddForm.css';
const AddForm = ({ addTask }) => {
  const [testo, setTesto] = useState('');

  const handleSubmit = () => {
    if (testo !== '') {
      addTask(testo);
      setTesto('');
    }
  };
  return (
    <div className='add-form'>
      <input
        type='text'
        placeholder='Aggiungi una task'
        value={testo}
        onChange={(e) => setTesto(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: 'green',
          color: 'black',
          fontWeight: '600',
          borderRadius: '10px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        ADD
      </button>
    </div>
  );
};

export default AddForm;
