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
            <div className='main-container'>
                <div className='columns is-centered'>
                    <div className='column is-5 box'>
                    <h2 className='has-text-centered'>Name: {name}</h2>
                    <p className='has-text-centered'>Description: {description}</p>
                    {
                        tasks ? 
                        tasks.map((task) => (
                        <Task key={task._id} task={task} />
                        ))
                        :
                        <p>Loading...</p>
                    }
                    <div className='new-task'>
                        <p>Add new task:</p>
                        {/* Add new task: input and button */}
                        <div className='columns'>
                            <div className='column is-10'>
                                <div className='field'>
                                    <div className='control'>
                                        <input className="input is-primary" type="text" placeholder='Add new task'/>
                                    </div>
                                </div>
                            </div>
                            <div className='column auto'>
                                <button className='button is-primary'>Add</button>
                            </div>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className='button is-warning'>Delete To Do List</button>
                    </div>
                    </div>
               </div>
         </div>
        )
    }
}
