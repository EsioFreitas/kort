import { createSlice } from '@reduxjs/toolkit'

export const wipSlice = createSlice({
  name: 'wip',
  initialState: {
    wips: []
  },
  reducers: {
    addWip: (state, action) => {
      state.wips = [...state.wips, action.payload]
    },
  },
})

export const { addWip } = wipSlice.actions

export default wipSlice.reducer