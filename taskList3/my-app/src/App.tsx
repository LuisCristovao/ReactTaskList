import React, { useState, ChangeEvent } from 'react';

interface Task {
  id: number;
  text: string;
  isEditing: boolean;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Creates a new task in edit mode
  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      text: "",
      isEditing: true,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Toggle a task into edit mode when clicked
  const handleTaskClick = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  };

  // Update text in the textarea
  const handleChangeTaskText = (e: ChangeEvent<HTMLTextAreaElement>, id: number) => {
    const { value } = e.target;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: value } : task
      )
    );
  };

  // Permanently remove a task
  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // End edit mode and keep the changes
  const handleConfirmEdit = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isEditing: false } : task
      )
    );
  };

  // Show up to 3 lines, then '...'
  const getPreviewText = (text: string) => {
    const lines = text.split('\n');
    if (lines.length <= 3) {
      return text;
    }
    return lines.slice(0, 3).join('\n') + '\n...';
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>Task List</h2>
      <button onClick={handleAddTask}>+ Add Task</button>

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: '1px solid #ccc',
            margin: '8px 0',
            padding: '8px',
          }}
        >
          {task.isEditing ? (
            <div>
              <textarea
                rows={4}
                value={task.text}
                onChange={(e) => handleChangeTaskText(e, task.id)}
                style={{ width: '100%' }}
              />
              <div style={{ marginTop: '4px' }}>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                <button onClick={() => handleConfirmEdit(task.id)}>✔</button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => handleTaskClick(task.id)}
              style={{ whiteSpace: 'pre-line', cursor: 'pointer' }}
            >
              {getPreviewText(task.text) || 'Click to edit...'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
