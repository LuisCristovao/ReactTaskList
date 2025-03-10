import React from "react";

interface TaskInputProps {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  isAdding: boolean;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  addTask: () => void;
}

const TaskInputComponent: React.FC<TaskInputProps> = ({
  newTask,
  setNewTask,
  isAdding,
  setIsAdding,
  addTask,
}) => {
  return isAdding ? (
    <li className="cool-list">
      <input
        id="new-task"
        type="text"
        value={newTask}
        autoFocus
        onChange={(e) => setNewTask(e.target.value)}
        onBlur={addTask}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
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
