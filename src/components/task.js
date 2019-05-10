import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap'

export class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 202923,
            description : props.task.description,
            date : props.task.date,
            time : props.task.time,
            taskDeadline : props.task.taskDeadline,
            taskComplete : props.task.taskComplete,
            inEditMode : false,
        }
        // let {taskID, description, date, time}=this.state;
    }

    static getDerivedStateFromProps(props, state) {
        return {...state, taskComplete: props.task.taskComplete };
    }
    
    style=()=>{
        return {
            background : '#f4f4f4',
            padding : '10px',
            borderBottom : '1px #ccc dotted',
            textDecoration : this.props.task.taskComplete ? 'line-through' : 'none'
        }
    }

    

    onEditClick=()=> {
        this.setState({inEditMode : true});
    }

    onChange = (event) => {
        this.setState({ [event.target.name] : event.target.value })
    };

    render() {
        const {taskID, description, taskDeadline}=this.props.task;
        let edit = <form>
            <input type="text" name = "description" onChange={this.onChange} value = {this.state.description}/>
            <input type="date" name = "date" onChange={this.onChange} value = {this.state.date}/>
            <input type="time" name = "time" onChange={this.onChange} value = {this.state.time}/>
        </form>
        let stable = <Container onClick ={()=>{this.onEditClick()}}>
            <Row>
                <Col sm={8}>{description}</Col>
                <Col sm={4}>{taskDeadline}</Col>
            </Row>
        </Container>
         return (
            <div style ={this.style()}>
                <input type ="checkbox" onChange = {() => this.props.completionist(taskID, this.state)} checked={this.state.taskComplete}/>
                {this.state.inEditMode? edit : stable}
                <button onClick={() => {this.state.inEditMode?this.props.updateTask(taskID, this.state):this.props.delTask(taskID)}} style={btnStyle}>{this.state.inEditMode?"Edit":"delete"}                    
                </button>
                
            </div>
        );
    }

}

Task.propTypes = {
    task : PropTypes.object.isRequired,
    completionist : PropTypes.func.isRequired,
    delTask : PropTypes.func.isRequired,
    // updateTask : PropTypes.func.isRequired,
    // addTask : PropTypes.func.isRequired
}

const btnStyle = {
    background : '#ff0000',
    color : '#fff',
    border : 'none'
}

export default Task;