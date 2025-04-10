import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom"; // Add this import
import ListComponent from "./components/ListComponent";
import TaskInputComponent from "./components/taskInputComponent";

function App() {
  const [newTask, setNewTask] = useState(""); // Track input state

  const [tasks, setTasks] = useState<string[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]); // Add task to array
    }
    setNewTask(""); // Reset input
  };

  const updateTask = (index: number, updatedTask: string) => {
    const newTasks = [...tasks]; // Creates a new array (immutability)
    newTasks[index] = updatedTask; // Updates only the specific task
    setTasks(newTasks);
    return newTasks; // Returns the updated array
  };
  // Delete a task by index
  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index); // Remove task at index
    setTasks(newTasks);
    window.location.reload();
    //console.log(newTasks)
    return newTasks;
  };

  // NEW: Reorder tasks when dragging finishes
  const reorderTasks = (startIndex: number, endIndex: number) => {
    const newTasks = [...tasks];
    // Remove the dragged item
    const [removed] = newTasks.splice(startIndex, 1);
    // Insert it at the new position
    newTasks.splice(endIndex, 0, removed);
    // Update state
    setTasks(newTasks);
    window.location.reload();
  };

  const navigate = useNavigate();

  const handleShareNavigation = () => {
    navigate("/share");
  };

  return (
    <>
      <button
        onClick={handleShareNavigation}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          padding: "8px 16px",
          backgroundColor: "#1a1a1a",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Share
      </button>
      <h1>Tasks</h1>
      <ul className="cool-list">
        <TaskInputComponent
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
        <ListComponent
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
          reorderTasks={reorderTasks}
        />
      </ul>
    </>
  );
}

export default App;
