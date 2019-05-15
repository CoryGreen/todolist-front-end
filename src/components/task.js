import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import { Container, Row, Col } from 'react-bootstrap'

export class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inEditMode : false
        }
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

    editTask = (event)=>{
	event.preventDefault();
	const oldTaskID = this.props.task.taskID;
	const newTask = this.refs.taskChange.value;
	// const newDate = this.refs.dateChange.value;
	// const newTime = this.refs.timeChange.value;
	// const newDeadline = newDate + ' ' + newTime;
	this.props.updateTask(oldTaskID, newTask);
	this.setState ({inEditMode : false });
    }

    render() {
        const {taskID, description}=this.props.task;
        let edit = <form>
            <input type="text" name = "description" ref = "taskChange" defaultValue = {description}/>
            {/*<input type="date" name = "date" ref = "dateChange" defaultValue = {date}/>
            <input type="time" name = "time" ref = "timeChange" defaultValue = {time}/>*/}
	    <button onClick={this.editTask} style={btnStyle}>Edit</button>
        </form>
        let stable = <div>
			<div onClick={()=>{this.onEditClick()}}>
			    {description}
			</div>
			<div>
			    <button onClick={()=>this.props.delTask(taskID)} style={btnStyle}>delete</button>
			</div>
		     </div>
	/*<Container onClick ={()=>{this.onEditClick()}}>
            <Row>
                <Col sm={8}>{description}</Col>
                <Col sm={4}>{taskDeadline}</Col>
            </Row>
	    <Row>
		<button onClick={()=>this.props.delTask(taskID)} style={btnStyle}>delete</button>
	    </Row>
        </Container>*/
        return (
            <div style ={this.style()}>
                <input type ="checkbox" onChange = {() => this.props.completionist(taskID, this.state)} checked={this.state.taskComplete}/>
                {this.state.inEditMode? edit : stable}
                
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
