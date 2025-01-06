import { useEffect, useState } from 'react';
import AddForm from './components/AddForm';
import RenderTask from './components/RenderTask';
import RenderModify from './components/RenderModify';
import Statistiche from './components/Statistiche';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { DndContext, closestCorners } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
function App() {
  const [listaTask, setListaTask] = useState(() => {
    const taskSalvate = localStorage.getItem('listaTask');
    return taskSalvate ? JSON.parse(taskSalvate) : [];
  });
  const [mostraStats, setMostraStats] = useState(false);

  const addTask = (task) => {
    setListaTask([
      ...listaTask,
      { task: task, id: uuidv4(), isCompleted: false, isEditing: false },
    ]);
  };

  const deleteTask = (taskFiltrata) => {
    console.log('cliccato');
    setListaTask(listaTask.filter((task) => task.id !== taskFiltrata));
  };

  const toggleCompleted = (taskID) => {
    setListaTask(
      listaTask.map((task) =>
        task.id === taskID ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };
  const toggleModify = (taskID) => {
    setListaTask(
      listaTask.map((task) =>
        task.id === taskID ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const updateTask = (taskID, nuovaTask) => {
    setListaTask(
      listaTask.map((task) =>
        task.id === taskID
          ? {
              ...task,
              task: nuovaTask,
              isEditing: !task.isEditing,
            }
          : task
      )
    );
  };
  const moveTask = (taskID, direction) => {
    const indice = listaTask.findIndex((task) => task.id === taskID);
    if (indice < 0) return;
    const nuovaLista = [...listaTask];

    if (direction === 'up' && indice > 0) {
      [nuovaLista[indice], nuovaLista[indice - 1]] = [
        nuovaLista[indice - 1],
        nuovaLista[indice],
      ];
    }

    if (direction === 'down' && indice < nuovaLista.length - 1) {
      [nuovaLista[indice], nuovaLista[indice + 1]] = [
        nuovaLista[indice + 1],
        nuovaLista[indice],
      ];
    }

    setListaTask(nuovaLista);
  };
  const ottieniPositione = (id) => {
    return listaTask.findIndex((task) => task.id === id);
  };
  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (!over || active.id === over.id) return;

    setListaTask((tasks) => {
      const originalPosition = ottieniPositione(active.id);
      const newPosition = ottieniPositione(over.id);

      return arrayMove(tasks, originalPosition, newPosition);
    });
  };

  useEffect(() => {
    localStorage.setItem('listaTask', JSON.stringify(listaTask));
  }, [listaTask]);

  return (
    <>
      <div
        style={{ position: 'relative', zIndex: '5' }}
        className='contenitore-todo'
      >
        <button
          onClick={() => setMostraStats(!mostraStats)}
          style={{
            position: 'absolute',
            right: '15px',
            top: '15px',
            color: 'black',
            fontSize: '18px',
            borderRadius: '50%',
            padding: '3px 5px',
            backgroundColor: '#E1EACD',
          }}
        >
          {mostraStats ? (
            <i className='fa-solid fa-arrow-left'></i>
          ) : (
            <i className='fa-solid fa-arrow-right'></i>
          )}
        </button>
        <h1>Aggiungi una task</h1>
        <AddForm addTask={addTask}></AddForm>
        <h1>Non completati</h1>
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div style={{ width: '100%', padding: '.5rem 0' }}>
            <SortableContext
              items={listaTask.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {listaTask
                .filter((task) => !task.isCompleted)
                .map((task) =>
                  !task.isEditing ? (
                    <RenderTask
                      key={task.id}
                      task={task}
                      deleteTask={deleteTask}
                      toggleCompleted={toggleCompleted}
                      toggleModify={toggleModify}
                      moveTask={moveTask}
                      id={task.id}
                    />
                  ) : (
                    <RenderModify
                      key={task.id}
                      task={task}
                      updateTask={updateTask}
                      toggleModify={toggleModify}
                    />
                  )
                )}
            </SortableContext>
          </div>
        </DndContext>
        <h1>Completati</h1>
        {listaTask
          .filter((task) => task.isCompleted)
          .map((task) => (
            <RenderTask
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
              toggleModify={toggleModify}
              moveTask={moveTask}
              id={task.id}
            />
          ))}
      </div>
      <Statistiche mostraStats={mostraStats} task={listaTask}></Statistiche>
    </>
  );
}

export default App;
