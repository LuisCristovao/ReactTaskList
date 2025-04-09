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

  const [touchStartIndex, setTouchStartIndex] = useState<number | null>(null);

  let currentIndex:number|null=null

  // Save index of the item on drag start
  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    index: number
  ) => {
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
  };

  // Mobile support 👇
  const handleTouchStart = (index: number) => {
    setTouchStartIndex(index);
  };
  const handleTouchMove = (
    e: React.TouchEvent<HTMLLIElement>
  ) => {
    // Typically you'd update something if you want real "drag" feedback.
    // We'll keep it empty for simplicity or you might set state like:
    // setTouchHoveredIndex(currentIndex);
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    
    // Find the element at these coordinates
    const element = document.elementFromPoint(x, y);
    let index =element?.getAttribute("data-index")
    // Now 'element' is the HTML element under the touch point
    console.log(element?.getAttribute("data-index")); // For example, log the element
    if(index===null || index===undefined) return;
    currentIndex=parseInt(index)
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLLIElement>) => {

  
    if(currentIndex===null || currentIndex===undefined) return;
    if (touchStartIndex === null) return;
    if (touchStartIndex !== currentIndex) {
      reorderTasks(touchStartIndex, currentIndex);
    }
    setTouchStartIndex(null);
  };

  return (
    <>
      {tasks.map((task, index) => {
        return (
          <LIComponent
            key={index}
            task={task}
            index={index}
            updateTask={updateTask}
            deleteTask={deleteTask}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            // Mobile drag events 👇
            onTouchStart={() => handleTouchStart(index)}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={(e) => handleTouchEnd(e)}
          />
        );
      })}
    </>
  );
};

export default ListComponent;
