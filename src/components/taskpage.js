import React, { Component } from 'react';
import TaskSetter from './tasksetter';
// import Heading from './layout/Heading';
import AddTask from './AddTask';
// import UpdateTask from './components/UpdateTask';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import {connection} from './Constants';

class TaskPage extends Component {
    constructor() {
        super();
        this.state = {
            tasks: []
        }
    }
    componentDidMount() {
        axios.get(`${connection}`)
            .then(res => this.setState({ tasks: res.data }))
    }

    completionist = (id) => {
        this.setState({
            tasks: this.state.tasks.map(task => {
                if (task.taskID === id) {
                    task.taskComplete = !task.taskComplete;
                    console.log(id);
                    axios.put(`${connection}/${id}`, task);
                }
                return task;
            })
        });
    }

    delTask = (id) => {
        axios.delete(`${connection}/${id}`)
            //.then(res => this.setState({tasks : [...this.state.tasks.filter(task=>task.id!==id)] }));
            .then(res => {
                let tasksLeft = this.state.tasks.filter(task => task.taskID !== id);
                this.setState({ tasks: tasksLeft });
            })
    }

    addTask = (childStates) => {
        let body = childStates;
        axios.post(`${connection}`, body)
            .then(res => {
                let newTasks = this.state.tasks;
                newTasks.push(res.data);
                this.setState({ tasks: newTasks });
            });
    }

    updateTask = (id, thisbody) => {
        let newBody = {
            userID: thisbody.userID,
            taskID: id,
            date:thisbody.date,
            time:thisbody.time,
            description: thisbody.description,
            taskDeadline: thisbody.taskDeadline,
            taskComplete: thisbody.taskComplete
        }
        axios.put(`${connection}/${id}`, newBody)
            .then(res => {
                let updatedTasks = this.state.tasks;
                this.setState({ tasks: updatedTasks });
            });
        thisbody.inEditMode = false;
    }
    render() {
        console.log(this.state.tasks)
        return (
            <Router>
                <div className="TaskPage">
                    <div className="container">
                        {/* <Heading/> */}
                        <Route path="/" render={props => (
                            <React.Fragment>
                                <AddTask addTask={this.addTask} />
                                <TaskSetter tasks={this.state.tasks} completionist={this.completionist} delTask={this.delTask} updateTask={this.updateTask} />
                            </React.Fragment>
                        )}
                        />
                    </div>
                </div>
            </Router>
        );
    }
}

export default TaskPage;