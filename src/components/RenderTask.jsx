import React from 'react';
import './RenderTask.css';
const RenderTask = ({ task, deleteTask, toggleCompleted }) => {
  const handleDelete = () => {
    deleteTask(task);
  };

  const handleIsCompleted = () => {
    toggleCompleted(task.id);
  };
  return (
    <div className='render-task'>
      <div className='checkbox-wrapper-28'>
        <input
          id={`checkbox-${task.id}`}
          type={`checkbox`}
          className='promoted-input-checkbox'
          defaultChecked={task.isCompleted}
          onClick={handleIsCompleted}
        />
        <svg>
          <use xlinkHref='#checkmark-28' />
        </svg>
        <label htmlFor={`checkbox-${task.id}`}></label>
        <svg xmlns='http://www.w3.org/2000/svg' style={{ display: 'none' }}>
          <symbol id='checkmark-28' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeMiterlimit='10'
              fill='none'
              d='M22.9 3.7l-15.2 16.6-6.6-7.1'
            ></path>
          </symbol>
        </svg>
      </div>
      <h3>{task.task}</h3>
      <button onClick={handleDelete}>X</button>
    </div>
  );
};

export default RenderTask;
