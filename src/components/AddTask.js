import React, { Component } from 'react';
import PropTypes from 'prop-types'

export class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 202923,
            description: '',
            date: '',
            time: '',
            taskComplete: false
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        
        this.props.addTask({
            ...this.state,
            taskDeadline: this.state.date + ' ' + this.state.time
        });
        this.setState({
            description: '',
            userID: 202923,
            date : '',
            time : '',
            taskComplete: false
        });
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}
                style={{ display: 'flex' }}>
                <input type="text" name="description"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="add task..."
                    value={this.state.description}
                    onChange={this.onChange}
                />
                {/*<input type="date" name="date" placeholder="deadline" value={this.state.date} onChange={this.onChange} />
                <input type="time" name="time" value={this.state.time} onChange={this.onChange} />*/}
                <input type="submit" value="submit"
                    className="btn"
                    style={{ flex: 1 }}
                />
            </form>
        );
    }
}

AddTask.propTypes = {
    addTask: PropTypes.func.isRequired,
}

export default AddTask;
