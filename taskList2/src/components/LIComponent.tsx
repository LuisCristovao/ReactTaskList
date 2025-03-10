import { useState } from "react";

interface LIComponentProps {
  task: string;
  index: number;
}

const LIComponent: React.FC<LIComponentProps> = ({ task, index }) => {
  const [isEditing, setIsEditing] = useState(false);

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
          {task}
        </li>
      ) : (
        <li
          key={index}
          className="cool-list"
        >
          {task}
        </li>
      )}
    </>
  );
};

export default LIComponent;
