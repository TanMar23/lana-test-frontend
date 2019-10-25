import React, { Component } from 'react'

export default class Task extends Component {
    state = {
        completed: this.props.task.completed
    }

    render() {
        const {name} = this.props.task
        const {completed} = this.state

        return (
            <div>
                <p className={completed && 'completed'}>{name}</p>
                <button className='is-primary'>Delete</button>
            </div>
        )
    }
}
