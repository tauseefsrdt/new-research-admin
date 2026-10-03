import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const executeSearch = createAsyncThunk(
  'search/execute',
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get('/search', { params: { q: query } });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to execute search');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: {
      papers: [],
      indexed: [],
      books: [],
      total: 0,
    },
    query: '',
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = { papers: [], indexed: [], books: [], total: 0 };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(executeSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload || { papers: [], indexed: [], books: [], total: 0 };
      })
      .addCase(executeSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
