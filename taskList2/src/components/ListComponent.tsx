
import LIComponent from './LIComponent'

interface ListComponentProps {
  tasks: string[];
}


const ListComponent: React.FC<ListComponentProps> = ({ tasks }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <LIComponent
            task={task}
            index={index}
        />
      ))}
    </>
  );
};

export default ListComponent;
