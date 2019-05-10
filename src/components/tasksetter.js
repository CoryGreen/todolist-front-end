import React from 'react';
import Task from './task';
import PropTypes from 'prop-types';

const TaskSetter = ({ tasks, completionist, delTask, updateTask }) => tasks.map((task) => (
  <Task key={task.taskID} task={task} completionist={completionist} delTask={delTask} updateTask={updateTask} />
));

TaskSetter.propTypes = {
  tasks: PropTypes.array.isRequired,
  completionist: PropTypes.func.isRequired,
  delTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired
}
export default TaskSetter;
