import React, { Component } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import Swal from 'sweetalert2'
import Axios from 'axios'

export default class Task extends Component {
  state = {
    completed: this.props.task.completed
  }

  deleteTask = async () => {
    await Axios.delete(`http://localhost:3000/api/todo/${this.props.toDoId}/task/${this.props.task._id}`)
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'Task deleted successfully',
      showConfirmButton: false,
      toast: true,
      timer: 2000
    })
    this.props.getTasks()
  }

  checkTask = async () => {
    await Axios.put(`http://localhost:3000/api/todo/${this.props.toDoId}/task/${this.props.task._id}`)
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'Done',
      showConfirmButton: false,
      toast: true,
      timer: 2000
    })
    this.setState({
      completed: this.state.completed ? false : true
    })
  }

  render() {
    const { name } = this.props.task
    const { completed } = this.state

    return (
      <div>
        <div className="columns">
          <button onClick={this.deleteTask} className="icon-button button column is-1">
            <FiTrash2 />
          </button>
          <div className="column is-1">
            <input onClick={this.checkTask} type="checkbox" checked={completed ? true : false} />
          </div>
          <div className="column">
            <p className={completed ? 'completed' : undefined}>{name}</p>
          </div>
        </div>
      </div>
    )
  }
}
