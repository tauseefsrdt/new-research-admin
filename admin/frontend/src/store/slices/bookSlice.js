import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchBooks = createAsyncThunk(
  'books/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/books', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch books');
    }
  }
);

export const createBook = createAsyncThunk(
  'books/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/books', data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create book');
    }
  }
);

export const updateBook = createAsyncThunk(
  'books/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/books/${id}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update book');
    }
  }
);

export const deleteBook = createAsyncThunk(
  'books/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/books/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete book');
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    loading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || [];
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBook.pending, (state) => { state.actionLoading = true; })
      .addCase(createBook.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(createBook.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(updateBook.pending, (state) => { state.actionLoading = true; })
      .addCase(updateBook.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updateBook.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(deleteBook.pending, (state) => { state.actionLoading = true; })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalElements = Math.max(0, state.totalElements - 1);
      })
      .addCase(deleteBook.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; });
  }
});

export default bookSlice.reducer;
