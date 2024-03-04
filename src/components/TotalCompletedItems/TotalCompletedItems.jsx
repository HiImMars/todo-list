import { useSelector } from "react-redux";
import { selectTodos } from "../../redux/todos/selectors";
import { useMemo } from "react";

const TotalCompletedItems = () => {
  const todos = useSelector(selectTodos);

  const memoizedCompletedItems = useMemo(() => {
    return todos.filter((todo) => todo.completed);
  }, [todos]);

  return (
    <h4 className="text-xl mx-auto">
      Total completed tasks: {memoizedCompletedItems.length}
    </h4>
  );
};

export default TotalCompletedItems;
