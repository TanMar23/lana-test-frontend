import React, { Component } from 'react'
import Axios from 'axios'
import Task from './Task'
import Swal from 'sweetalert2'

export default class ToDo extends Component {
  state = {
    tasks: undefined,
    newTask: {
      name: ''
    }
  }

  getData = async () => {
    const { data } = await Axios.get(`http://localhost:3000/api/todo/${this.props.todo._id}/task`)
    this.setState({
      tasks: data.task
    })
  }

  handleInput = e => {
    this.setState({
      newTask: {
        ...this.state.newTask,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    await Axios.post(`http://localhost:3000/api/todo/${this.props.todo._id}/task`, this.state.newTask)
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'task list created successfully',
      showConfirmButton: false,
      toast: true,
      timer: 2000
    })
    this.setState({
      newTask: {
        name: ''
      }
    })
    this.getData()
  }

  deleteToDo = async () => {
    await Axios.delete(`http://localhost:3000/api/todo/${this.props.todo._id}`)
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'TODO list deleted successfully',
      showConfirmButton: false,
      toast: true,
      timer: 2000
    })
    this.props.getToDos()
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { name, description } = this.props.todo
    const { tasks } = this.state

    return (
      <div className="main-container">
        <div className="columns is-centered">
          <div className="column is-5 box">
            <h2 className="has-text-centered">Name: {name}</h2>
            <p className="has-text-centered">Description: {description}</p>
            {tasks ? (
              tasks.map(task => (
                <Task key={task._id} task={task} toDoId={this.props.todo._id} getTasks={this.getData} />
              ))
            ) : (
              <p>Loading...</p>
            )}
            <div className="new-task">
              <p>Add new task:</p>
              {/* Add new task: input and button */}
              <form onSubmit={this.handleSubmit} className="columns">
                <div className="column is-10">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-primary"
                        type="text"
                        placeholder="Add new task"
                        name="name"
                        onChange={this.handleInput}
                        value={this.state.newTask.name}
                      />
                    </div>
                  </div>
                </div>
                <div className="column auto">
                  <button className="button is-primary">Add</button>
                </div>
              </form>
            </div>
            <div className="buttons">
              <button onClick={this.deleteToDo} className="button is-warning">
                Delete To Do List
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
