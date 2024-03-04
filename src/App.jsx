import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoList } from "./components/TodoList/TodoList";
import TotalCompletedItems from "./components/TotalCompletedItems/TotalCompletedItems";

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 px-2 py-5 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">ToDo List</h1>
      <TodoForm />
      <h2 className="text-xl font-bold">Your tasks</h2>
      <TotalCompletedItems />
      <TodoList />
    </div>
  );
}

export default App;
