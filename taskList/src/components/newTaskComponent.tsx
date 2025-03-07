import { useState } from "react";

interface NewTaskProps {
  tasks: string[];
  setTasks: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewTaskComponent: React.FC<NewTaskProps> = ({ tasks, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState("");

  return (
    <li
      key={tasks.length + 1}
      className="cool-list"
      style={isEditing ? { backgroundColor: "#1a1a1a", cursor: "default" } : {}}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          key="new_task"
          type="text"
          autoFocus
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onBlur={() => {
            if (newTask.trim()) {
              setTasks([...tasks, newTask]);
            }
            setIsEditing(false);
            setNewTask("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (newTask.trim()) {
                setTasks([...tasks, newTask]);
              }
              setIsEditing(false);
              setNewTask("");
            }
          }}
        />
      ) : (
        "+"
      )}
    </li>
  );
};

export default NewTaskComponent;
