import React, { Component } from 'react'
import Axios from 'axios'
import ToDo from './ToDo'
import Swal from 'sweetalert2'

export default class App extends Component {
  state = {
    todos: undefined,
    newToDo: {
      name: '',
      description: ''
    }
  }

  getData = async () => {
    const { data } = await Axios.get(`http://localhost:3000/api/todo`)
    this.setState({
      todos: data.todoList
    })
  }

  handleInput = e => {
    this.setState({
      newToDo: {
        ...this.state.newToDo,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    await Axios.post(`http://localhost:3000/api/todo`, this.state.newToDo)
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'TODO list created successfully',
      showConfirmButton: false,
      toast: true,
      timer: 2000
    })
    this.setState({
      newToDo: {
        name: '',
        description: ''
      }
    })
    this.getData()
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { todos } = this.state

    return (
      <div className="main-container">
        <h1 className="title">TO-DO LIST</h1>

        <div className="columns is-centered">
          <form onSubmit={this.handleSubmit} className="box column is-5">
            <h2 className="add-new">ADD A NEW LIST:</h2>
            <div className="field">
              <div className="control">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={this.handleInput}
                  value={this.state.newToDo.name}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <textarea
                  className="textarea is-primary"
                  placeholder="Description"
                  name="description"
                  onChange={this.handleInput}
                  value={this.state.newToDo.description}></textarea>
              </div>
            </div>
            <div className="buttons">
              <button className="button is-primary" type="submit">
                Create new
              </button>
            </div>
          </form>
        </div>
        <div>
          {todos ? todos.map(todo => <ToDo key={todo._id} todo={todo} getToDos={this.getData} />) : <p>Loading...</p>}
        </div>
      </div>
    )
  }
}
