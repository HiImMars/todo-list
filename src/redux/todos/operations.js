import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://65e5f6d9d7f0758a76e7da1b.mockapi.io";

export const getTodos = createAsyncThunk(
  "todos/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/todo");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todo, thunkAPI) => {
    try {
      const response = await axios.post("/todo", {
        title: todo.title,
        description: todo.description,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId, thunkAPI) => {
    try {
      const response = await axios.delete(`/todo/${todoId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTodoCompleted = createAsyncThunk(
  "todos/updateTodoCompleted",
  async ({ todoId, completed }, thunkAPI) => {
    try {
      const existingTodo = thunkAPI
        .getState()
        .todos.todos.items.find((todo) => todo.id === todoId);

      const response = await axios.put(`/todo/${todoId}`, {
        ...existingTodo,
        completed,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
