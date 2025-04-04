import { useState, useRef,useEffect } from "react";

interface LIComponentProps {
  task: string;
  index: number;
  updateTask: (index: number, updatedTask: string) => void;
  deleteTask: (index: number) => void;
}

const LIComponent: React.FC<LIComponentProps> = ({
  task,
  index,
  updateTask,
  deleteTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task);

  // Create a reference for the textarea element
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Adjust height of the textarea based on content
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set it to the scrollHeight
    }
  };
  useEffect(() => {
    if (isEditing) {
      adjustHeight(); // Adjust the height when editing starts
    }
  }, [isEditing]);

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
          <textarea
            ref={textareaRef}  // Assign the ref to the textarea
            autoFocus
            style={{
              width: "100%",
              height: "100%",
            }}
            onChange={(e) => {
              setNewTask(e.target.value);
              updateTask(index, e.target.value);
              
            }}
            
            onBlur={() => {
              setIsEditing(false);
            }}
            value={newTask}
          />
        </li>
      )}
    </>
  );
};

export default LIComponent;
