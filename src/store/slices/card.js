import { createSlice } from "@reduxjs/toolkit";
import { cards, tasks } from "../../initial";


export const cardSlice = createSlice({
  name: "card",
  initialState: {
    cards: cards,
    tasks: tasks,
    lastId: cards.length + 1,
    lastTaskId: tasks.length + 1
  },
  reducers: {
    create: (state, action) => {
      state.cards = [...state.cards, action.payload]
      state.lastId += 1
    },
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload]
      state.lastTaskId += 1
    },
    updateCard: (state, action) => {
      const payload = action.payload;
      let cardIndex = state.cards.findIndex(el => el.id === payload.id);
      state.cards[cardIndex] = payload;
    },
    updateTask: (state, action) => {
      const payload = action.payload;
      let taskIndex = state.tasks.findIndex(el => el.id === payload.id);
      state.tasks[taskIndex] = payload;
    },
  },
})

export const { create, updateCard, addTask, updateTask } = cardSlice.actions

export default cardSlice.reducer