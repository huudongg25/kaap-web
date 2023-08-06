// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const dataTreeSlice = createSlice({
  name: 'dataTree',
  initialState: {
    tree: []
  },
  reducers: {
    updateTreeSlice: (state: any, action: any) => {
      state.tree.push(action.payload)
      if (action.payload.id !== 'change') {
        localStorage.setItem('tree', JSON.stringify(state.tree))
      } else if (action.payload.id == 'out-libs') {
        state.tree = []
        localStorage.removeItem('tree')
      }

      state.tree = [...state.tree].filter((item: any) => {
        return item.id !== 'out-libs'
      })
      state.tree = [...state.tree].filter((item: any) => {
        return item.id !== 'change'
      })
      const lastItemTree = state?.tree.slice(-1)[0]

      if (Array.isArray(state.tree)) {
        if (action.payload.id === 'root') {
          state.tree = []
        } else if (action.payload.id === 'change') {
          state.tree = state.tree.slice(0, state.tree.length)
        } else {
          for (let index = 0; index < state.tree.length - 1; index++) {
            if (state.tree[index].parent.id == lastItemTree.parent.id) {
              state.tree = state.tree.slice(0, index)
              state.tree.push(lastItemTree)

              break
            }
          }
        }
      }
    }
  }
})

export const { updateTreeSlice } = dataTreeSlice.actions
export default dataTreeSlice.reducer
