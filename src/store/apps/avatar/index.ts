// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const dataAvatarSlice = createSlice({
  name: 'dataAvatarSlice',
  initialState: {
    // https://i.imgur.com/KQrY49w.png
    avatar: ''
  },
  reducers: {
    updateDataAvatarSlice: (state, action) => {
      state.avatar = action.payload.avatar
    }
  }
})

export const { updateDataAvatarSlice } = dataAvatarSlice.actions
export default dataAvatarSlice.reducer
