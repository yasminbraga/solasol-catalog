import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Product, { ProductsResponse } from '../interfaces/Product'
import { RootState } from '../app/store'
import api from '../services/api'

interface InitialState {
  data: Product[]
  meta: {
    firstPage: number
    lastPage: number
    currentPage: number
    total: number
  }
  loading: boolean
}

const initialState: InitialState = {
  data: [],
  loading: true,
  meta: {
    currentPage: 1,
    firstPage: 1,
    lastPage: 1,
    total: 0,
  },
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filter?: RootState['filter']) => {
    const { data } = await api.get<ProductsResponse>('/products', {
      params: {
        name: filter?.name,
        categoryIds: filter?.categories,
        page: filter?.page,
      },
    })

    return data.products
  }
)

const productsSlice = createSlice({
  initialState,
  name: 'products',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.meta = {
          currentPage: action.payload.meta.current_page,
          firstPage: action.payload.meta.first_page,
          lastPage: action.payload.meta.last_page,
          total: action.payload.meta.total,
        }
        state.loading = false
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false
      })
  },
})

export const selectProducts = (state: RootState) => state.products

export default productsSlice.reducer
