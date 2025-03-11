import { useState, useEffect } from "react";
import "./App.css";
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
    setTasks((prevTasks) => {
      // Calls React's setTasks function
      const newTasks = [...prevTasks]; // Creates a new array (immutability)
      newTasks[index] = updatedTask; // Updates only the specific task
      return newTasks; // Returns the updated array
    });
  };
  // Delete a task by index
  const deleteTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index)); // Remove task at index
  };

  return (
    <>
      <h1>Tasks</h1>
      <ul className="cool-list">
        <ListComponent tasks={tasks} />
        <TaskInputComponent
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      </ul>
    </>
  );
}

export default App;
