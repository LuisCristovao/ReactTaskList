interface ListComponentProps {
  tasks: string[];
}

const ListComponent: React.FC<ListComponentProps> = ({ tasks }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <li
          key={index}
          className="cool-list"
          onMouseOver={() => console.log(task, index)}
        >
          {task}
        </li>
      ))}
    </>
  );
};

export default ListComponent;
