import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const list_class = "cool-list";
  const tasks = ["1", "2", "333"];
  // State to track which list item is hovered
  const [listIndex, setlistIndex] = useState<number | null>(null);

  return (
    <>
      <h1>Tasks</h1>
      <ul className={list_class}>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={list_class}
            onMouseOver={() => {
              setlistIndex(index);
              console.log(listIndex);
            }} // Set hover index
          >
            {task}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
