import React, { useState } from 'react';
import './RenderTask.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
const RenderTask = ({
  task,
  deleteTask,
  toggleCompleted,
  toggleModify,
  moveTask,
  id,
}) => {
  const [drag, setDrag] = useState(false);
  let dragTimer = null;
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({ id, disabled: !drag });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: drag ? '0.5' : '1',
  };
  const handleMouseEnter = () => {
    dragTimer = setTimeout(() => {
      setDrag(true);
    }, 1000);
  };
  const handleMouseLeave = () => {
    clearTimeout(dragTimer);
    setDrag(false);
  };
  return (
    <div
      className='render-task'
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      <div className='temp'>
        <div className='checkbox-wrapper-28'>
          <input
            id={`checkbox-${task.id}`}
            type={`checkbox`}
            className='promoted-input-checkbox'
            defaultChecked={task.isCompleted}
            onClick={() => toggleCompleted(task.id)}
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
        <button
          style={{ fontSize: '1rem' }}
          onClick={() => toggleModify(task.id)}
        >
          <i className='fa-solid fa-pencil' style={{ color: 'black' }}></i>
        </button>
        <button
          onClick={() => moveTask(task.id, 'up')}
          style={{ fontSize: '14px' }}
        >
          👆
        </button>
        <button
          onClick={() => moveTask(task.id, 'down')}
          style={{ fontSize: '14px' }}
        >
          👇
        </button>
        <button
          style={{
            backgroundColor: '#c93e48',
            color: 'black',
            fontWeight: '600',
            fontSize: '1rem',
          }}
          onClick={() => deleteTask(task.id)}
        >
          <i className='fa-regular fa-trash-can'></i>
        </button>
      </div>
      {task.isCompleted && <div className='task-completata'></div>}
    </div>
  );
};

export default RenderTask;
