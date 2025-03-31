import { useState } from "react";

interface LIComponentProps {
  task: string;
  index: number;
  updateTask:(index:number,updatedTask:string)=>void,
  deleteTask: (index: number)=>void
}

const LIComponent: React.FC<LIComponentProps> = ({ task, index,updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task);

  return (
    <>
      {!isEditing ? (
        <li
          key={index}
          className="cool-list"
          onMouseOver={() => console.log(task, index)}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {newTask}
        </li>
      ) : (
        <li key={index} className="cool-list">
          <input
            autoFocus
            type="text"
            onChange={(e) => {
              setNewTask(e.target.value);
              updateTask(index,e.target.value)
            }}
            onBlur={()=>{setIsEditing(false)}}
            value={newTask}
          />
        </li>
      )}
    </>
  );
};

export default LIComponent;
