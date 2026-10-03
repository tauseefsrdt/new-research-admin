import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchTheses = createAsyncThunk(
  'theses/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/theses', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch thesis records');
    }
  }
);

export const createThesis = createAsyncThunk(
  'theses/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/theses', data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create thesis record');
    }
  }
);

export const updateThesis = createAsyncThunk(
  'theses/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/theses/${id}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update thesis record');
    }
  }
);

export const deleteThesis = createAsyncThunk(
  'theses/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/theses/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete thesis record');
    }
  }
);

const thesisSlice = createSlice({
  name: 'theses',
  initialState: {
    items: [],
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    loading: true,
    actionLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTheses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || [];
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTheses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createThesis.pending, (state) => { state.actionLoading = true; })
      .addCase(createThesis.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(createThesis.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(updateThesis.pending, (state) => { state.actionLoading = true; })
      .addCase(updateThesis.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updateThesis.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(deleteThesis.pending, (state) => { state.actionLoading = true; })
      .addCase(deleteThesis.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalElements = Math.max(0, state.totalElements - 1);
      })
      .addCase(deleteThesis.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; });
  }
});

export default thesisSlice.reducer;
