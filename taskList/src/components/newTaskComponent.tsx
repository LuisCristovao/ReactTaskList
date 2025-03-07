import { useState } from "react";

interface NewTaskProps {
  tasks: string[];
  setTasks: React.Dispatch<React.SetStateAction<string[]>>;
  selectedIndex: number | null;
  listRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
}

const NewTaskComponent: React.FC<NewTaskProps> = ({ tasks, setTasks, selectedIndex, listRefs }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState("");

  return (
    <li
      key={tasks.length}
      className={`cool-list ${selectedIndex === tasks.length ? "selected" : ""}`}
      style={isEditing ? { backgroundColor: "#1a1a1a", cursor: "default" } : {}}
      ref={(el) => {
        if (el) {
          listRefs.current[tasks.length] = el; // Store reference
        }
      }}
      
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
