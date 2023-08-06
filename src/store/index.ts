// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import dataAvatarSlice from 'src/store/apps/avatar'
import dataUsernameSlice from 'src/store/apps/nameAccount'
import dataTreeSlice from 'src/store/apps/tree'
import dataVideo from 'src/store/apps/video'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    dataAvatarSlice,
    dataUsernameSlice,
    dataTreeSlice,
    dataVideo
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
