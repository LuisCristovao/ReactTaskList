import { useState, useEffect, useRef } from "react";
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

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Tracks highlighted item
  const listRefs = useRef<(HTMLLIElement | null)[]>([]);

  

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (tasks.length === 0) return; // Prevent key actions when list is empty

      if (e.key === "ArrowDown") {
        setSelectedIndex((prevIndex) => {
          const nextIndex =
            prevIndex === null ? 0 : (prevIndex + 1) % (tasks.length + 1);
          return nextIndex;
        });
      }

      if (e.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => {
          const nextIndex =
            prevIndex === null
              ? tasks.length
              : (prevIndex - 1 + tasks.length + 1) % (tasks.length + 1);
          return nextIndex;
        });
      }

      if (e.key === "Enter" && selectedIndex !== null) {
        listRefs.current[selectedIndex]?.click(); // Trigger click event of selected item
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tasks, selectedIndex]);

  return (
    <>
      <h1>Tasks</h1>
      <ul className="cool-list">
        <ListComponent
          tasks={tasks}
          selectedIndex={selectedIndex}
          listRefs={listRefs}
        />
        <NewTaskComponent
          tasks={tasks}
          setTasks={setTasks}
          selectedIndex={selectedIndex}
          listRefs={listRefs}
        />
      </ul>
    </>
  );
}

export default App;
