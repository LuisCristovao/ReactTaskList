import { useState } from "react";
import "./App.css";
import ListComponent from "./components/ListComponent";
import TaskInputComponent from "./components/taskInputComponent";

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
        <TaskInputComponent
          newTask={newTask}
          setNewTask={setNewTask}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          addTask={addTask}
        />
      </ul>
    </>
  );
}

export default App;
