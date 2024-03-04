import { combineReducers } from "@reduxjs/toolkit";
import { todosReducer } from "./todos/todosSlice";

export const reducer = combineReducers({
  todos: todosReducer,
});
