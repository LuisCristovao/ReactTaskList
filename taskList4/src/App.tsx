import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';

interface Task {
  id: number;
  text: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  // Load tasks from localStorage on app mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('my-tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Whenever tasks change, store them in localStorage
  useEffect(() => {
    localStorage.setItem('my-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle changes in the "new task" text area
  const handleNewTaskChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTaskText(event.target.value);
  };

  // Add a new task
  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText.trim(),
    };
    setTasks(prev => [...prev, newTask]);
    setNewTaskText('');
  };

  // Start editing a task
  const handleStartEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  // Handle changes in the editing text area
  const handleEditingTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditingText(event.target.value);
  };

  // Stop editing (save changes)
  const handleStopEditing = () => {
    if (editingTaskId === null) return;
    setTasks(prev =>
      prev.map(task =>
        task.id === editingTaskId
          ? { ...task, text: editingText }
          : task
      )
    );
    setEditingTaskId(null);
    setEditingText('');
  };

  // Delete task
  const handleDeleteTask = (event: MouseEvent, taskId: number) => {
    event.stopPropagation(); 
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h1>Task List</h1>

      {/* Text area to create a new task */}
      <div style={{ marginBottom: '1rem' }}>
        <h3>Add new task:</h3>
        <textarea
          placeholder="Type a new task here (multiline)..."
          value={newTaskText}
          onChange={handleNewTaskChange}
          rows={3}
          style={{ width: '100%', marginBottom: '8px' }}
        />
        <br />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* List of tasks */}
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{
              border: '1px solid #999',
              padding: '8px',
              marginBottom: '8px',
              cursor: 'pointer'
            }}
            onClick={() => handleStartEditing(task)}
          >
            {editingTaskId === task.id ? (
              <div>
                {/* Editing mode */}
                <textarea
                  value={editingText}
                  onChange={handleEditingTextChange}
                  rows={3}
                  style={{ width: '100%' }}
                />
                <div style={{ marginTop: '8px' }}>
                  <button onClick={handleStopEditing}>Stop Editing</button>
                  <button onClick={(e) => handleDeleteTask(e, task.id)} style={{ marginLeft: '8px' }}>
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Display mode */}
                <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{task.text}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
