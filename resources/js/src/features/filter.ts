import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

interface FilterState {
  categories: number[]
  name?: string
  page?: number
}

const initialState: FilterState = {
  categories: [],
  page: 1,
}

const filterSlice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    addCategory: (state, action: PayloadAction<number>) => {
      if (state.categories.includes(action.payload)) return
      state.page = 1
      state.categories.push(action.payload)
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      state.page = 1
      state.categories = state.categories.filter((i) => !(i === action.payload))
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.page = 1
      state.name = action.payload
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
})

export const { addCategory, removeCategory, changeName, changePage } = filterSlice.actions

export const selectFilter = (state: RootState) => state.filter

export default filterSlice.reducer
