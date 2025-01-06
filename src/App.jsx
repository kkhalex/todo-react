import { useState } from 'react';
import AddForm from './components/AddForm';
import RenderTask from './components/RenderTask';
import './App.css';

function App() {
  const [listaTask, setListaTask] = useState([]);

  const addTask = (task) => {
    setListaTask([...listaTask, task]);
  };

  const deleteTask = (taskFiltrata) => {
    setListaTask(listaTask.filter((task) => task !== taskFiltrata));
  };
  return (
    <div className='contenitore-todo'>
      <h1>Aggiungi una task</h1>
      <AddForm addTask={addTask}></AddForm>

      {listaTask.map((task, index) => (
        <RenderTask key={index} task={task} deleteTask={deleteTask} />
      ))}
    </div>
  );
}

export default App;
