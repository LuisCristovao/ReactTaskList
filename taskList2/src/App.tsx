import { useState,useEffect} from "react";
import "./App.css";
import ListComponent from "./components/ListComponent";
import TaskInputComponent from "./components/taskInputComponent";

function App() {
  
  const [newTask, setNewTask] = useState(""); // Track input state
  const [isAdding, setIsAdding] = useState(false); // Control input visibility

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
