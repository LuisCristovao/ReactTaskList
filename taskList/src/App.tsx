import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const list_class = "cool-list";
  const [tasks, setTasks] = useState<string[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : []; // Parse JSON if exists, otherwise start empty
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState("");
 

  // Load tasks from localStorage on first render
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // Convert JSON string back to array
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <h1>Tasks</h1>
      <ul className={list_class}>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={list_class}
          >
            {task}
          </li>
        ))}
        <li key={tasks.length + 1} className={list_class} style={isEditing ? { backgroundColor: "#1a1a1a", cursor: "default" } : {}}
          onClick={()=>{
           setIsEditing(true)
          }}
        >
        {isEditing ? (
            <input
              key="new_task"
              type="text"
              autoFocus
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onBlur={() => {
                if (newTask.trim()) {
                  setTasks([...tasks, newTask]); // Save new task
                }
                setIsEditing(false); // Switch back to "+"
                setNewTask(""); // Clear input
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (newTask.trim()) {
                    setTasks([...tasks, newTask]);
                  }
                  setIsEditing(false);
                  setNewTask("");
                }
              }}
            />
          ) : (
            "+"
          )}
        </li>
      </ul>
    </>
  );
}

export default App;
