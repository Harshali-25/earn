import React, { useState } from 'react';
// Import local data if you have a json file, or start with an empty array
import data from "./data.json"; 
import Header from "./Header";
import ToDoList from "./ToDoList";
import ToDoForm from './ToDoForm';
import './App.css';

function App() {
  const [ toDoList, setToDoList ] = useState(data);

  // Toggle strikethrough for completed tasks
  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      // Comparison: task.id is compared against the clicked ID
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  }

  // Filter out completed tasks
  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    setToDoList(filtered);
  }

  // Add a new task to the list
  const addTask = (userInput ) => {
    let copy = [...toDoList];
    copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false }];
    setToDoList(copy);
  }

  return (
    <div className="App">
      {/* ADDED STRIKE STYLE HERE */}
      <style>{`
        .strike {
          text-decoration: line-through;
          color: #888;
          cursor: pointer;
        }
        .todo {
          cursor: pointer;
        }
      `}</style>

      <Header />
      <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
      <ToDoForm addTask={addTask}/>
    </div>
  );
}

export default App;