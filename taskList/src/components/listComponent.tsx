interface ListComponentProps {
    tasks: string[];
    selectedIndex: number | null;
    listRefs: React.RefObject<(HTMLLIElement | null)[]>;
  }
  
  const ListComponent: React.FC<ListComponentProps> = ({ tasks, selectedIndex, listRefs }) => {
    return (
      <>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`cool-list ${selectedIndex === index ? "selected" : ""}`} // Add highlight class
            ref={(el) => {
                if(el){
                    listRefs.current[index] = el
                }
            }} // Store reference to each list item
          >
            {task}
          </li>
        ))}
      </>
    );
  };
  
  export default ListComponent;
  