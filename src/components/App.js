import React, { Component } from 'react'
import Axios from 'axios';
import ToDo from './ToDo';


export default class App extends Component {
    state={
        todos: undefined
    }

    getData = async() => {
        const { data } =await Axios.get(`http://localhost:3000/api/todo`)
        this.setState({
            todos: data.todoList
        })
    }

    componentDidMount(){
        this.getData()
    }
    
    render() {
        const {todos} = this.state
        
        return (
            <div className='main-container'>
           
                    <div className='columns is-centered'>
                        <div className='box column is-6'>
                            <h2 className='add-new'>ADD A NEW LIST:</h2>
                            <div className='field'>
                                <div className='control'>
                                    <input className="input is-primary" type="text" placeholder='Name'/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <textarea className="textarea is-primary" placeholder="Description"></textarea>
                                </div>
                            </div>
                            <div className='buttons'>
                                <button className='button is-primary'>Create new</button>
                            </div>
                        </div>
                    </div>
            <div>      
                {
                    todos ? 
                    todos.map((todo) => (
                            <ToDo key={todo._id} todo={todo} />
                    ))
                    :
                    <p>Loading...</p>
                }
            </div>
            </div>
        )
    }
}
