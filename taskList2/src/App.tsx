import { useState } from "react";

import "./App.css";

function App() {
  let tasks = ["sssss", "aaaa", "oooooo"];

  return (
    <>
      <h1>Tasks</h1>
      <ul className="cool-list">
        {tasks.map((task, index) => {
          return (
            <li
              key={index}
              className="cool-list"
              onMouseOver={() => {
                return console.log(task, index);
              }}
            >
              {task}
            </li>
          );
        })}
        <li 
        key="new-task" 
        className="cool-list"
        onClick={(e)=>{
          
          e.target.outerHTML=`<input type="text" autoFocus onBlur="(this)=>{tasks.append(this.value)}" \>`
          // console.log(e)
        }}
        >+</li>
      </ul>
    </>
  );
}

export default App;
