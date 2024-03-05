import { useDispatch, useSelector } from "react-redux";
import { selectTodos } from "../../redux/todos/selectors.js";
import { addTodo } from "../../redux/todos/operations.js";
import { Notify } from "notiflix/build/notiflix-notify-aio";

export const TodoForm = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.elements.title.value;
    const description = form.elements.description.value;
    const lowerCaseTitle = title.toLowerCase();

    const isTodoExist = todos.some(
      (todo) =>
        (todo.title.toLowerCase() === lowerCaseTitle &&
          todo.description === description) ||
        todo.description === description ||
        todo.title.toLowerCase() === lowerCaseTitle
    );

    isTodoExist
      ? alert(
          `ToDo with that ${title} or ${description} is already present in your ToDo list.`
        )
      : dispatch(addTodo({ title: title, description: description }));

    Notify.success("New task was added!");

    form.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[85%] md:w-1/2 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-xl font-semibold">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={todos.title}
          placeholder="Max 30 characters"
          maxLength={30}
          required
          className="w-full py-1 px-2 rounded-xl text-md md:text-lg border border-black hover:border-blue-600 focus:outline-0 focus:border-blue-600 transition"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-xl font-semibold">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          cols={16}
          name="description"
          value={todos.description}
          placeholder="Maximum 200 characters"
          maxLength={200}
          required
          className="w-full py-1 px-2 rounded-xl text-md md:text-lg border border-black hover:border-blue-600 focus:outline-0 focus:border-blue-600 transition"
        />
      </div>
      <button
        type="submit"
        className="mx-auto w-1/2 p-4 text-lg rounded-xl bg-blue-300 hover:bg-blue-200 focus:bg-blue-200 transition-colors"
      >
        Add ToDo
      </button>
    </form>
  );
};
