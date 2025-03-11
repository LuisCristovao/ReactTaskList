import { useState } from "react";

interface LIComponentProps {
  task: string;
  index: number;
}

const LIComponent: React.FC<LIComponentProps> = ({ task, index }) => {
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
