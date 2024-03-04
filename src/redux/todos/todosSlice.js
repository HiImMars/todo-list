import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { todosInitialState } from "./todosInitialState";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodoCompleted,
} from "./operations";

const STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

const arrThunks = [addTodo, deleteTodo, getTodos];

const thunkType = (type) => arrThunks.map((element) => element[type]);

const handlePending = (state) => {
  state.todos.isLoading = true;
};

const handleFulfilled = (state) => {
  state.todos.isLoading = false;
  state.todos.error = null;
};

const handleFulfilledGet = (state, action) => {
  state.todos.items = action.payload;
};

const handleFulfilledCreate = (state, action) => {
  state.todos.items.push(action.payload);
};

const handleFulfilledDelete = (state, action) => {
  state.todos.items = state.todos.items.filter(
    (todo) => todo.id !== action.payload.id
  );
};

const handleRejected = (state, action) => {
  state.todos.isLoading = false;
  state.todos.error = action.payload;
};

const handleUpdateTodoCompleted = (state, action) => {
  const updatedTodo = action.payload;
  const existingTodoIndex = state.todos.items.findIndex(
    (todo) => todo.id === updatedTodo.id
  );

  if (existingTodoIndex !== -1) {
    state.todos.items[existingTodoIndex] = {
      ...state.todos.items[existingTodoIndex],
      completed: updatedTodo.completed,
    };
  }

  state.todos.error = null;
};

const handleRejectedUpdateTodoCompleted = (state, action) => {
  state.todos.error = action.payload;
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {
    filterTodos(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, handleFulfilledGet)
      .addCase(addTodo.fulfilled, handleFulfilledCreate)
      .addCase(deleteTodo.fulfilled, handleFulfilledDelete)
      .addCase(updateTodoCompleted.fulfilled, handleUpdateTodoCompleted)
      .addCase(updateTodoCompleted.rejected, handleRejectedUpdateTodoCompleted)
      .addMatcher(isAnyOf(...thunkType(STATUS.PENDING)), handlePending)
      .addMatcher(isAnyOf(...thunkType(STATUS.REJECTED)), handleRejected)
      .addMatcher(isAnyOf(...thunkType(STATUS.FULFILLED)), handleFulfilled);
  },
});

export const todosReducer = todosSlice.reducer;
export const { filterTodos } = todosSlice.actions;
