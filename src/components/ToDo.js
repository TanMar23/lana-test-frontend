import React, { Component } from 'react'
import Axios from 'axios'
import Task from './Task'

export default class ToDo extends Component {
    state={
        tasks: undefined
    }

    getData = async() => {
        const { data } =await Axios.get(`http://localhost:3000/api/todo/${this.props.todo._id}/task`)
        this.setState({
            tasks: data.task
        })
    }

    componentDidMount(){
        this.getData()
    }

    render() {
        const { name, description } = this.props.todo        
        const { tasks } = this.state

        return (
            <div>
                <h2>Name: {name}</h2>
                <p>Description: {description}</p>
                {
                    tasks ? 
                    tasks.map((task) => (
                       <Task key={task._id} task={task} />
                    ))
                    :
                    <p>Loading...</p>
                }
            </div>
        )
    }
}
