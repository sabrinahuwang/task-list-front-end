import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

import { useState, useCallback } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { NewTaskForm } from './components/NewTaskForm.js';

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
      const task = taskListState.find((task) => task.id === updatedTask);
      let url;
      if (task.isComplete) {
        url = `https://task-list-api-c17.herokuapp.com/tasks/${updatedTask}/mark_complete`;
      } else {
        url = `https://task-list-api-c17.herokuapp.com/tasks/${updatedTask}/mark_incomplete`;
      }

      axios.patch(url).then(() => {
        console.log(
          `Task ${updatedTask} marked ${
            task.isComplete ? 'complete' : 'incomplete'
          }`
        );
      });

      const tasks = taskListState.map((task) => {
        if (task.id === updatedTask) {
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
      // Make request to delete task from server
      const url = `https://task-list-api-c17.herokuapp.com/tasks/${updatedTask}`;
      // When server request completes, remove task from local state
      axios.delete(url).then(() => {
        console.log(`Task ${updatedTask} deleted`);
        const tasks = taskListState.filter((task) => {
          return task.id !== updatedTask;
        });
        setTaskListState(tasks);
      });
    },
    [taskListState]
  );

  const submitNewTask = useCallback(
    (newTask) => {
      const url = `https://task-list-api-c17.herokuapp.com/tasks`;
      axios.post(url, newTask).then((response) => {
        console.log(`Task ${response.data.task.id} submitted`);
        const newState = [...taskListState, response.data.task];
        setTaskListState(newState);
      });
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
          <NewTaskForm onSubmit={submitNewTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
