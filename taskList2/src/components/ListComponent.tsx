import LIComponent from "./LIComponent";

interface ListComponentProps {
  tasks: string[];
  updateTask: (index: number, updatedTask: string) => void;
  deleteTask: (index: number) => void;
}

const ListComponent: React.FC<ListComponentProps> = ({
  tasks,
  updateTask,
  deleteTask,
}) => {
  return (
    <>
      {tasks.map((task, index) => {

        return <LIComponent
          key={index}
          task={task}
          index={index}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />;
      })
      }
    </>
  );
};

export default ListComponent;
