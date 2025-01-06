import { useState } from 'react';
import AddForm from './components/AddForm';
import './App.css';

function App() {
  const [listaTask, setListaTask] = useState([]);

  const addTask = (task) => {
    setListaTask([...listaTask, task]);
  };
  return (
    <div className='contenitore-todo'>
      <AddForm addTask={addTask}></AddForm>

      {listaTask.map((task) => (
        <h1>{task}</h1>
      ))}
    </div>
  );
}

export default App;
