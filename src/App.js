// React Imports
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Components
import { CreateTask } from './components/CreateTask';
import { DisplayAllTasks } from './components/DisplayAllTasks'
import { Navbar } from './components/Navbar';
function App() {
  const [allTasks, setNewTask] = useState([]),
    // cambiar el estado de la tarea
    changeStatus = id => {
      setNewTask(() => allTasks.map(task => task.id === id ? { ...task, status: !task.status } : task))
    },
    updateTask = task => {
      setNewTask(allTasks.map(t => (t.id === task.id) ? task : t))
    },
    createNewTask = newTask => {
      setNewTask([...allTasks, newTask])
    },
    deleteTask = id => {
      setNewTask(allTasks.filter(task => task.id !== id))
    },
    // generar un id autoincremental
    newID = () => {
      return (allTasks.length <= 0) ? 1 : Math.max(...allTasks.map(t => t.id));
    }
  useEffect(() => {
    const data = localStorage.getItem('tasks');
    if (data != null) {
      setNewTask(JSON.parse(data))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(allTasks))
  }, [allTasks])

  return (
    <Router>
      <Navbar />
      <div className="App container">
        <Switch>
          <Route path="/create">
            <CreateTask
              createNewTask={createNewTask}
              newID={newID} />
          </Route>
          <Route path="/update/:idParam">
            <CreateTask allTasks={allTasks} updateTask={updateTask} />
          </Route>
          <Route exact path="/">
            <DisplayAllTasks allTasks={allTasks}
              deleteTask={deleteTask}
              changeStatus={changeStatus} />
          </Route>

        </Switch>
      </div>
    </Router>
  )
}

export default App;
