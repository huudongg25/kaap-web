// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const dataVideo = createSlice({
  name: 'dataAvatarSlice',
  initialState: {
    name: '',
    roleGeneral: 2,
    user: {
      avatar: '',
      name: ''
    },
    updatedDate: new Date()
  },
  reducers: {
    updateDataVideo: (state, action) => {
      ;(state.name = action.payload.name), (state.roleGeneral = action.payload.roleGeneral)
      ;(state.updatedDate = action.payload.updatedDate), (state.user = action.payload.user)
    }
  }
})

export const { updateDataVideo } = dataVideo.actions
export default dataVideo.reducer
