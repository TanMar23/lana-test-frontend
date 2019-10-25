import React, { Component } from 'react'
// import FontAwesomeIcon from '@fortawesome/react-fontawesome'

export default class Task extends Component {
    state = {
        completed: this.props.task.completed
    }

    render() {
        const {name} = this.props.task
        const {completed} = this.state

        return (
            <div>
                <div className='columns'>
                    <div className='column'>
                        <p className={completed && 'completed'}>{name}</p>
                    </div>
                    <div className='column'>
                        <button className='button'>Delete</button>
                    </div>
                </div>
                {/* <span>
                    <i className="far fa-trash-alt"></i>
                </span> */}
            </div>
        )
    }
}
