import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchLeaderships = createAsyncThunk(
  'leaderships/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/leaderships', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch leadership');
    }
  }
);

export const createLeadership = createAsyncThunk(
  'leaderships/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/leaderships', data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create leadership');
    }
  }
);

export const updateLeadership = createAsyncThunk(
  'leaderships/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/leaderships/${id}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update leadership');
    }
  }
);

export const deleteLeadership = createAsyncThunk(
  'leaderships/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/leaderships/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete leadership');
    }
  }
);

const leadershipSlice = createSlice({
  name: 'leaderships',
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
      .addCase(fetchLeaderships.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderships.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || [];
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchLeaderships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createLeadership.pending, (state) => { state.actionLoading = true; })
      .addCase(createLeadership.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(createLeadership.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(updateLeadership.pending, (state) => { state.actionLoading = true; })
      .addCase(updateLeadership.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updateLeadership.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(deleteLeadership.pending, (state) => { state.actionLoading = true; })
      .addCase(deleteLeadership.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalElements = Math.max(0, state.totalElements - 1);
      })
      .addCase(deleteLeadership.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; });
  }
});

export default leadershipSlice.reducer;
