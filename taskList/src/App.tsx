import { useState, useEffect } from "react";
import "./App.css";
import ListComponent from "./components/listComponent";
import NewTaskComponent from "./components/newTaskComponent";

function App() {
  const [tasks, setTasks] = useState<string[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <h1>Tasks</h1>
      <ul className="cool-list">
        <ListComponent tasks={tasks} />
        <NewTaskComponent tasks={tasks} setTasks={setTasks} />
      </ul>
    </>
  );
}

export default App;
