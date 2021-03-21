import React from 'react'
import { Link } from 'react-router-dom'

export const DisplayAllTasks = props => (
  [...props.allTasks].reverse().map(task => (
    <div className={`task ${(task.status) ? 'task-finished' : ''}`} key={task.id}>
      <div className="task-body">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-text">{task.description}</p>
        <button className="btn btn-delete" onClick={() => props.deleteTask(task.id)}><i className="bi bi-x-circle-fill"></i></button>
        <Link to={"/update/" + task.id} className="btn btn-edit"><i className="bi bi-pencil-fill"></i></Link>
        <input type="checkbox" className="task-status" id={`taskStatus${task.id}`} onChange={() => props.changeStatus(task.id)} checked={task.status} />
        <label className={`icon-status ${(task.status) ? 'checked' : ''}`} htmlFor={`taskStatus${task.id}`}>
          <span className="checkbox"></span>
        </label>
      </div>
    </div>
  ))
)

