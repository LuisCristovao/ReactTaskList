import LIComponent from "./LIComponent";
import { useState } from "react";



interface ListComponentProps {
  tasks: string[];
  updateTask: (index: number, updatedTask: string) => void;
  deleteTask: (index: number) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
}

const ListComponent: React.FC<ListComponentProps> = ({
  tasks,
  updateTask,
  deleteTask,
  reorderTasks,
}) => {

  // Which item is currently being dragged
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Save index of the item on drag start
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    setDraggedIndex(index);
  };

  // Enable dropping on other list items
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  // Reorder tasks on drop
  const handleDrop = (e: React.DragEvent<HTMLLIElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    if (draggedIndex === dropIndex) return;

    reorderTasks(draggedIndex, dropIndex);
    setDraggedIndex(null);
    window.location.reload()
  };



  return (
    <>
      {tasks.map((task, index) => {

        return <LIComponent
          key={index}
          task={task}
          index={index}
          updateTask={updateTask}
          deleteTask={deleteTask}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        />;
      })
      }
    </>
  );
};

export default ListComponent;
