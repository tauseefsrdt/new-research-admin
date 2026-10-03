import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';
import { Book } from '../../types';

interface BookState {
  items: Book[];
  allItems: Book[];
  featuredItems: Book[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  allLoading: boolean;
  error: string | null;
}

const initialState: BookState = {
  items: [],
  allItems: [],
  featuredItems: [],
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  pageSize: 10,
  loading: false,
  allLoading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk(
  'books/fetchList',
  async (params: { search?: string; status?: string; year?: string | number; page?: number; size?: number; sortBy?: string; sortDir?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/books', { params });
      return response.data?.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch books');
    }
  }
);

export const fetchAllBooks = createAsyncThunk(
  'books/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/books/all');
      return (response.data?.data || []) as Book[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all books');
    }
  }
);

export const fetchFeaturedBooks = createAsyncThunk(
  'books/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/books/featured');
      return (response.data?.data || []) as Book[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch featured books');
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Paginated
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        if (payload && Array.isArray(payload.content)) {
          state.items = payload.content;
          state.totalElements = payload.totalElements;
          state.totalPages = payload.totalPages;
          state.pageNumber = payload.pageNumber;
          state.pageSize = payload.pageSize;
        } else if (Array.isArray(payload)) {
          state.items = payload;
          state.totalElements = payload.length;
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // All
      .addCase(fetchAllBooks.pending, (state) => {
        state.allLoading = true;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.allLoading = false;
        state.allItems = action.payload;
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.allLoading = false;
        state.error = action.payload as string;
      })
      // Featured
      .addCase(fetchFeaturedBooks.fulfilled, (state, action) => {
        state.featuredItems = action.payload;
      });
  },
});

export default bookSlice.reducer;
