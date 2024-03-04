export const selectTodos = (state) => state.todos.todos.items;
export const selectIsLoading = (state) => state.todos.todos.isLoading;
export const selectError = (state) => state.todos.todos.error;
export const selectFilter = (state) => state.todos.filter;
