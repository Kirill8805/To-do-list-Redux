import { configureStore, createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    return [];
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("todos", JSON.stringify(state));
  } catch (err) {
    console.error("Ошибка сохранения в localStorage", err);
  }
};

const todoSlice = createSlice({
  name: "todos",
  initialState: loadState(),
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        dueDate: action.payload.dueDate,
      });
      saveState(state);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
      saveState(state);
    },
    deleteTodo: (state, action) => {
      const newState = state.filter((t) => t.id !== action.payload);
      saveState(newState);
      return newState;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export const store = configureStore({ reducer: { todos: todoSlice.reducer } });
