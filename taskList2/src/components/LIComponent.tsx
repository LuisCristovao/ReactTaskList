import { useState, useRef, useEffect } from "react";

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
          
          className="cool-list"
          //onMouseOver={() => console.log(task, index)}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {newTask}
        </li>
      ) : (
        <li  className="cool-list">
          <textarea
            ref={textareaRef} // Assign the ref to the textarea
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
          <button
            style={{
              backgroundColor: "black",
              border: "white solid 1px",
              fontSize: "24px",
              cursor: "pointer",
              color: "green", // Style for the check mark button
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from bubbling up
              //deleteTask(index);   // Delete the task
              setIsEditing(false); // Exit editing mode
            }}
            onMouseDown={(e) => e.preventDefault()} // Prevent focus shift before click
          >
            &#x2714; {/* Check mark symbol */}
          </button>
          <button
            style={{
              backgroundColor: "black",
              border: "white solid 1px",
              fontSize: "24px",
              cursor: "pointer",
              marginLeft:"10px"
              
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from bubbling up
              deleteTask(index);   // Delete the task
              setIsEditing(false); // Exit editing mode
            }}
            onMouseDown={(e) => e.preventDefault()} // Prevent focus shift before click
          >
            🗑️ {/* trash symbol */}
          </button>
        </li>
        
      )}
    </>
  );
};

export default LIComponent;
