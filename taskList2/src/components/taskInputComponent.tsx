import { useState,useRef } from "react";

interface TaskInputProps {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  addTask: () => void;
}

const TaskInputComponent: React.FC<TaskInputProps> = ({
  newTask,
  setNewTask,
  addTask,
}) => {

  const [isAdding, setIsAdding] = useState(false); // Control input visibility
  // Create a reference for the textarea element
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return isAdding ? (
    <li className="cool-list">
      <textarea
        ref={textareaRef} // Assign the ref to the textarea
        autoFocus
        style={{
          width: "100%",
          height: "100%",
          
        }}
        rows={5}
        onChange={(e) => {
          setNewTask(e.target.value)
         
        }}
        onBlur={() => {
          addTask();
          setIsAdding(false);
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
              addTask();
              setIsAdding(false); // Exit editing mode
            }}
            onMouseDown={(e) => e.preventDefault()} // Prevent focus shift before click
          >
             &#x2714; {/* Check mark symbol */}
          </button>
      
      
    </li>
  ) : (
    <li 
    className="cool-list"
     onClick={() => setIsAdding(true)}
     style={{border:"5px solid white"}}
     >
      + Add task
    </li>
  );
};

export default TaskInputComponent;
