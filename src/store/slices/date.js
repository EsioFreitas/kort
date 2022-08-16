import { createSlice } from '@reduxjs/toolkit'

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    date: new Date()
  },
  reducers: {
    addDay: (state, action) => {
      const newDate = new Date(state.date.getTime());
      newDate.setDate(newDate.getDate() + 1);
      state.date = newDate
    },
  },
})

export const { addDay } = dateSlice.actions

export default dateSlice.reducer