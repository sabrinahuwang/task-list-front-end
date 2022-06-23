import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

import { useState, useCallback } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

// 1. Find task with the ID
const App = () => {
  const [taskListState, setTaskListState] = useState(TASKS);
  // 2. Toggle the strikethrough
  // 3. Set new state

  const handleTaskCompleteToggle = useCallback(
    (updatedTask) => {
      const tasks = taskListState.map((task) => {
        if (task.id === updatedTask.id) {
          // Use spread syntax to duplicate the object and flip isComplete
          return { ...task, isComplete: !task.isComplete };
        } else {
          return task;
        }
      });

      setTaskListState(tasks);
    },
    [taskListState]
  );
  const deleteTask = useCallback(
    (updatedTask) => {
      const tasks = taskListState.filter((task) => {
        if (task.id === updatedTask.id) {
          // Use spread syntax to duplicate the object and delete the specific task
          return false;
        } else {
          return true;
        }
      });

      setTaskListState(tasks);
    },
    [taskListState]
  );
  const url = 'https://task-list-api-c17.herokuapp.com/tasks';

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        const data = response.data.map((task) => ({
          id: task.id,
          title: task.title,
          isComplete: task.is_complete,
        }));
        setTaskListState(data);
      })
      .catch((error) => {
        console.log();
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskListState}
            onTaskCompleteToggle={handleTaskCompleteToggle}
            deleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
