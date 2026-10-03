import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchPatents = createAsyncThunk(
  'patents/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/patents', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch patents');
    }
  }
);

export const createPatent = createAsyncThunk(
  'patents/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/patents', data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create patent');
    }
  }
);

export const updatePatent = createAsyncThunk(
  'patents/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/patents/${id}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update patent');
    }
  }
);

export const deletePatent = createAsyncThunk(
  'patents/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/patents/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete patent');
    }
  }
);

const patentSlice = createSlice({
  name: 'patents',
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
      .addCase(fetchPatents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || [];
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPatents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPatent.pending, (state) => { state.actionLoading = true; })
      .addCase(createPatent.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(createPatent.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(updatePatent.pending, (state) => { state.actionLoading = true; })
      .addCase(updatePatent.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updatePatent.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(deletePatent.pending, (state) => { state.actionLoading = true; })
      .addCase(deletePatent.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalElements = Math.max(0, state.totalElements - 1);
      })
      .addCase(deletePatent.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; });
  }
});

export default patentSlice.reducer;
