import { useState } from "react";
import "./App.css";
import ListComponent from "./components/ListComponent";

function App() {
  const [tasks, setTasks] = useState(["sssss", "aaaa", "oooooo"]);
  const [newTask, setNewTask] = useState(""); // Track input state
  const [isAdding, setIsAdding] = useState(false); // Control input visibility

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]); // Add task to array
    }
    setNewTask(""); // Reset input
    setIsAdding(false); // Hide input
  };

  return (
    <>
      <h1>Tasks</h1>
      <ul className="cool-list">
        <ListComponent tasks={tasks} />

        {/* Clickable + button that turns into an input */}
        {isAdding ? (
          <li className="cool-list">
            <input
              id="new-task"
              type="text"
              value={newTask}
              autoFocus
              onChange={(e) => setNewTask(e.target.value)}
              onBlur={addTask}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
            />
          </li>
        ) : (
          <li
            className="cool-list"
            onClick={() => setIsAdding(true)} // Show input on click
          >
            +
          </li>
        )}
      </ul>
    </>
  );
}

export default App;
