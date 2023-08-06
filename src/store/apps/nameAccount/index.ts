// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const dataUsernameSlice = createSlice({
  name: 'dataUsernameSlice',
  initialState: {
    name: ''
  },
  reducers: {
    updateDataUsernameSlice: (state, action) => {
      state.name = action.payload.name
    }
  }
})

export const { updateDataUsernameSlice } = dataUsernameSlice.actions
export default dataUsernameSlice.reducer
