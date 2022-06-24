import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  function onDeleteClick() {
    props.onDeleteCallback(props.id);
  }
  function onClickFlip() {
    props.onClickCallback(props.id);
  }
  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${
          props.isComplete ? 'tasks__item__toggle--completed' : ''
        }`}
        onClick={onClickFlip}
      >
        {props.title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={onDeleteClick}
        data-testid="delete button 42"
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  onClickCallback: PropTypes.func.isRequired,
  onDeleteCallback: PropTypes.func.isRequired,
};

export default Task;
