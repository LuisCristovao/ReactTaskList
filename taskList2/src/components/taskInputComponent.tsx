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
      
    </li>
  ) : (
    <li className="cool-list" onClick={() => setIsAdding(true)}>
      +
    </li>
  );
};

export default TaskInputComponent;
