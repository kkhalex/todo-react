import React from 'react';
import './RenderTask.css';
const RenderTask = ({
  task,
  deleteTask,
  toggleCompleted,
  toggleModify,
  moveTask,
}) => {
  const handleDelete = () => {
    deleteTask(task);
  };

  const handleIsCompleted = () => {
    toggleCompleted(task.id);
  };

  const handleModify = () => {
    toggleModify(task.id);
  };

  const handleSwitchUp = () => {
    moveTask(task.id, 'up');
  };
  const handleSwitchDown = () => {
    moveTask(task.id, 'down');
  };
  return (
    <div className='render-task'>
      <div className='temp'>
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
        <button style={{ fontSize: '1rem' }} onClick={handleModify}>
          <i className='fa-solid fa-pencil' style={{ color: 'black' }}></i>
        </button>
        <button onClick={handleSwitchUp} style={{ fontSize: '14px' }}>
          👆
        </button>
        <button onClick={handleSwitchDown} style={{ fontSize: '14px' }}>
          👇
        </button>
        <button
          style={{
            backgroundColor: '#c93e48',
            color: 'black',
            fontWeight: '600',
            fontSize: '1rem',
          }}
          onClick={handleDelete}
        >
          <i className='fa-regular fa-trash-can'></i>
        </button>
      </div>
      {task.isCompleted && <div className='task-completata'></div>}
    </div>
  );
};

export default RenderTask;
