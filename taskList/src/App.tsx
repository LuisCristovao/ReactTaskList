import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const list_class = "cool-list";
  let tasks = ["1", "2", "333"];
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
        <li key={tasks.length + 1} className={list_class} 
          onClick={(event)=>{
            console.log(event)
            const clickedElement = event.target as HTMLElement; // TypeScript-safe cast
            clickedElement.innerHTML="<input id='new_task' type='text' autoFocus/>"
          }}
          onBlur={(event)=>{
            
            const clickedElement = event.target as HTMLElement; // TypeScript-safe cast
            console.log(clickedElement.innerText)
            
          }}
        >
          +
        </li>
      </ul>
    </>
  );
}

export default App;
