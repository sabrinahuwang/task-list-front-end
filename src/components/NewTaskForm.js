import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const NewTaskForm = (props) => {
  //add rendered Tasks to the App
  const [newTaskName, setNewTaskName] = useState('');
  const handleInputChange = (event) => {
    setNewTaskName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({ title: newTaskName, description: '' });
  };
  // trigger a POST request to Task List API to create a new task in the database

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="TaskName">Task name:</label>
      <input
        type="text"
        id="fname"
        name="TaskName"
        value={newTaskName}
        onChange={handleInputChange}
      />
      <input type="submit" value="add task" />
    </form>
  );
};
NewTaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
