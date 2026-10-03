import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchPhdSupervisors = createAsyncThunk(
  'phdSupervisors/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/phd-supervisors', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch PhD supervisor records');
    }
  }
);

export const createPhdSupervisor = createAsyncThunk(
  'phdSupervisors/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/phd-supervisors', data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create PhD supervisor record');
    }
  }
);

export const updatePhdSupervisor = createAsyncThunk(
  'phdSupervisors/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/phd-supervisors/${id}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update PhD supervisor record');
    }
  }
);

export const deletePhdSupervisor = createAsyncThunk(
  'phdSupervisors/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/phd-supervisors/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete PhD supervisor record');
    }
  }
);

const phdSupervisorSlice = createSlice({
  name: 'phdSupervisors',
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
      .addCase(fetchPhdSupervisors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhdSupervisors.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || [];
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPhdSupervisors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPhdSupervisor.pending, (state) => { state.actionLoading = true; })
      .addCase(createPhdSupervisor.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(createPhdSupervisor.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(updatePhdSupervisor.pending, (state) => { state.actionLoading = true; })
      .addCase(updatePhdSupervisor.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updatePhdSupervisor.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(deletePhdSupervisor.pending, (state) => { state.actionLoading = true; })
      .addCase(deletePhdSupervisor.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalElements = Math.max(0, state.totalElements - 1);
      })
      .addCase(deletePhdSupervisor.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; });
  }
});

export default phdSupervisorSlice.reducer;
