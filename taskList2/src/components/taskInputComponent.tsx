import { useState } from "react";

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

  return isAdding ? (
    <li className="cool-list">
      <input
        id="new-task"
        type="text"
        value={newTask}
        autoFocus
        onChange={(e) => setNewTask(e.target.value)}
        onBlur={()=>{
            addTask()
            setIsAdding(false)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
            setIsAdding(false)
          }
        }}
      />
    </li>
  ) : (
    <li className="cool-list" onClick={() => setIsAdding(true)}>
      +
    </li>
  );
};

export default TaskInputComponent;
