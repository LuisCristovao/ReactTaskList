interface ListComponentProps {
    tasks: string[];
  }
  
  const ListComponent: React.FC<ListComponentProps> = ({ tasks }) => {
    return (
      <>
        {tasks.map((task, index) => (
          <li key={index} className="cool-list">
            {task}
          </li>
        ))}
      </>
    );
  };
  
  export default ListComponent;
  