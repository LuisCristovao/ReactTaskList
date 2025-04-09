import React, { useState, ChangeEvent, FC } from 'react';

interface Task {
  id: number;
  text: string;
}

interface TaskInputProps {
  input: string;
  setInput: (value: string) => void;
  addTask: () => void;
}

interface TaskItemProps {
  task: Task;
  removeTask: (id: number) => void;
}

interface TaskListProps {
  tasks: Task[];
  removeTask: (id: number) => void;
}

const styles = {
  appContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1rem'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  inputContainer: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  input: {
    flex: 1,
    padding: '0.5rem'
  },
  addButton: {
    padding: '0.5rem 1rem'
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '0.25rem'
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    color: 'red',
    cursor: 'pointer'
  }
};

const TaskInput: FC<TaskInputProps> = ({ input, setInput, addTask }) => (
  <div style={styles.inputContainer}>
    <input
      value={input}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
      placeholder="Enter a new task"
      style={styles.input}
    />
    <button onClick={addTask} style={styles.addButton}>Add</button>
  </div>
);

const TaskItem: FC<TaskItemProps> = ({ task, removeTask }) => (
  <div style={styles.taskItem}>
    <span>{task.text}</span>
    <button
      onClick={() => removeTask(task.id)}
      style={styles.deleteButton}
    >
      &#128465;
    </button>
  </div>
);

const TaskList: FC<TaskListProps> = ({ tasks, removeTask }) => (
  <div style={styles.taskList}>
    {tasks.map(task => (
      <TaskItem key={task.id} task={task} removeTask={removeTask} />
    ))}
  </div>
);

const TaskApp: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>('');

  const addTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.title}>Task App</h1>
      <TaskInput input={input} setInput={setInput} addTask={addTask} />
      <TaskList tasks={tasks} removeTask={removeTask} />
    </div>
  );
};

export default TaskApp;