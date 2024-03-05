import { useDispatch, useSelector } from "react-redux";
import {
  selectTodos,
  selectError,
  selectIsLoading,
} from "../../redux/todos/selectors.js";
import {
  deleteTodo,
  getTodos,
  updateTodoCompleted,
} from "../../redux/todos/operations.js";
import { Triangle } from "react-loader-spinner";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useEffect, useState } from "react";

export const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [currentFilter, setCurrentFilter] = useState("All");
  const [selected, setSelected] = useState("All");

  const filteredTodos = todos.filter((todo) =>
    currentFilter === "All"
      ? true
      : currentFilter === "Current"
      ? !todo.completed
      : todo.completed
  );

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo(todoId));
    Notify.warning("Task was deleted");
  };

  const handleToggleCompleted = (todoId, completed) => {
    dispatch(updateTodoCompleted({ todoId, completed }));
  };

  const handleChangeFilter = (filterType) => {
    setCurrentFilter(filterType);
    setSelected(filterType);
  };

  return (
    <>
      {isLoading && (
        <div className="bg-[rgba(0,0,0,0.7)] w-full h-full fixed top-0 left-0 flex justify-center items-center">
          <Triangle
            height="80"
            width="80"
            radius="9"
            color="white"
            ariaLabel="loading"
            className="z-50"
          />
        </div>
      )}
      {error && <p className="text-xl font-semibold">Something went wrong</p>}
      <ul className="flex w-full justify-center items-center gap-5">
        <li>
          <button
            onClick={() => handleChangeFilter("All")}
            className={`${
              selected === "All"
                ? "bg-blue-800 text-white hover:bg-blue-600 focus:bg-blue-600"
                : "bg-blue-300"
            } text-xl p-2 md:p-4 rounded-md hover:bg-blue-200 focus:bg-blue-200 transition`}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => handleChangeFilter("Current")}
            className={`${
              selected === "Current"
                ? "bg-blue-800 text-white hover:bg-blue-600 focus:bg-blue-600"
                : "bg-blue-300"
            } text-xl p-2 md:p-4 rounded-md hover:bg-blue-200 focus:bg-blue-200 transition`}
          >
            Current
          </button>
        </li>
        <li>
          <button
            onClick={() => handleChangeFilter("Completed")}
            className={`${
              selected === "Completed"
                ? "bg-blue-800 text-white hover:bg-blue-600 focus:bg-blue-600"
                : "bg-blue-300"
            } text-xl p-2 md:p-4 rounded-md hover:bg-blue-200 focus:bg-blue-200 transition`}
          >
            Completed
          </button>
        </li>
      </ul>
      <ul className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredTodos.map(({ id, title, description, completed }) => (
          <li
            key={id}
            className="flex flex-col gap-4 p-4 rounded-lg bg-white shadow-md"
          >
            <div className="flex gap-4 items-center">
              <input
                className="w-[20px] h-[20px]"
                type="checkbox"
                checked={completed || false}
                onChange={() => handleToggleCompleted(id, !completed)}
              />
              <h3 className="text-xl">{title}</h3>
            </div>
            <p className="text-lg text-gray-600 break-words">{description}</p>
            <button
              className="mx-auto md:ml-auto md:mr-0 w-1/3 md:w-1/4 p-2 md:p-4 text-lg rounded-xl bg-red-300 hover:bg-red-400 focus:bg-red-400 transition"
              value={id}
              onClick={() => handleDeleteTodo(id)}
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
