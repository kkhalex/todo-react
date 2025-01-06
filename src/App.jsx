import { useState } from 'react';
import AddForm from './components/AddForm';
import RenderTask from './components/RenderTask';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [listaTask, setListaTask] = useState([]);

  const addTask = (task) => {
    setListaTask([
      ...listaTask,
      { task: task, id: uuidv4(), isCompleted: false },
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
  return (
    <div className='contenitore-todo'>
      <h1>Aggiungi una task</h1>
      <AddForm addTask={addTask}></AddForm>
      <h1>Non completati</h1>
      {listaTask
        .filter((task) => !task.isCompleted)
        .map((task) => (
          <RenderTask
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
      <h1>Completati</h1>
      {listaTask
        .filter((task) => task.isCompleted)
        .map((task) => (
          <RenderTask
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
    </div>
  );
}

export default App;
