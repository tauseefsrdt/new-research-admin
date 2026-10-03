import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchVacantSeats = createAsyncThunk(
  'vacantSeats/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/vacant-seats', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch vacant seats');
    }
  }
);

export const createVacantSeat = createAsyncThunk(
  'vacantSeats/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/vacant-seats', data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create vacant seat');
    }
  }
);

export const updateVacantSeat = createAsyncThunk(
  'vacantSeats/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/vacant-seats/${id}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update vacant seat');
    }
  }
);

export const deleteVacantSeat = createAsyncThunk(
  'vacantSeats/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/vacant-seats/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete vacant seat');
    }
  }
);

const vacantSeatSlice = createSlice({
  name: 'vacantSeats',
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
      .addCase(fetchVacantSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacantSeats.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || [];
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchVacantSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createVacantSeat.pending, (state) => { state.actionLoading = true; })
      .addCase(createVacantSeat.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(createVacantSeat.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(updateVacantSeat.pending, (state) => { state.actionLoading = true; })
      .addCase(updateVacantSeat.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updateVacantSeat.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(deleteVacantSeat.pending, (state) => { state.actionLoading = true; })
      .addCase(deleteVacantSeat.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalElements = Math.max(0, state.totalElements - 1);
      })
      .addCase(deleteVacantSeat.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; });
  }
});

export default vacantSeatSlice.reducer;
