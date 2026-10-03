import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchPatrons = createAsyncThunk(
  'patrons/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/patrons', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch patrons');
    }
  }
);

export const createPatron = createAsyncThunk(
  'patrons/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/patrons', data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create patron');
    }
  }
);

export const updatePatron = createAsyncThunk(
  'patrons/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/patrons/${id}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update patron');
    }
  }
);

export const deletePatron = createAsyncThunk(
  'patrons/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/patrons/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete patron');
    }
  }
);

const patronSlice = createSlice({
  name: 'patrons',
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
      .addCase(fetchPatrons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatrons.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || [];
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPatrons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPatron.pending, (state) => { state.actionLoading = true; })
      .addCase(createPatron.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(createPatron.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(updatePatron.pending, (state) => { state.actionLoading = true; })
      .addCase(updatePatron.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updatePatron.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(deletePatron.pending, (state) => { state.actionLoading = true; })
      .addCase(deletePatron.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalElements = Math.max(0, state.totalElements - 1);
      })
      .addCase(deletePatron.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; });
  }
});

export default patronSlice.reducer;
