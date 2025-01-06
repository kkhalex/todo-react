import { useEffect, useState } from 'react';
import AddForm from './components/AddForm';
import RenderTask from './components/RenderTask';
import RenderModify from './components/RenderModify';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [listaTask, setListaTask] = useState(() => {
    const taskSalvate = localStorage.getItem('listaTask');
    return taskSalvate ? JSON.parse(taskSalvate) : [];
  });

  const addTask = (task) => {
    setListaTask([
      ...listaTask,
      { task: task, id: uuidv4(), isCompleted: false, isEditing: false },
    ]);
    console.log(listaTask);
  };

  const deleteTask = (taskFiltrata) => {
    setListaTask(listaTask.filter((task) => task !== taskFiltrata));
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
    console.log(taskID, nuovaTask);
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

  useEffect(() => {
    localStorage.setItem('listaTask', JSON.stringify(listaTask));
  }, [listaTask]);

  return (
    <div className='contenitore-todo'>
      <h1>Aggiungi una task</h1>
      <AddForm addTask={addTask}></AddForm>
      <h1>Non completati</h1>
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
          />
        ))}
    </div>
  );
}

export default App;
