import { createSlice } from '@reduxjs/toolkit'
import julia from "../../assets/users/julia.jpg"
import rodrigo from "../../assets/users/rodrigo.jpg"
import maria from "../../assets/users/maria.jpg"


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [
      {
        id: 1,
        name: "Julia Eduarda",
        photo: julia,
      },
      {
        id: 2,
        name: "Rodrigo Bertini",
        photo: rodrigo,
      },
      {
        id: 3,
        name: "Maria Fátima",
        photo: maria
      }
    ],
  },
  reducers: {
    create: (state, action) => {
      state.users = [...state.users, action.payload]
    },
  },
})

export const { create, update } = userSlice.actions

export default userSlice.reducer