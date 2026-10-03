import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchInstitutes = createAsyncThunk(
  'institutes/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/institutes', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch institutes');
    }
  }
);

export const createInstitute = createAsyncThunk(
  'institutes/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/institutes', data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create institute');
    }
  }
);

export const updateInstitute = createAsyncThunk(
  'institutes/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/institutes/${id}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update institute');
    }
  }
);

export const deleteInstitute = createAsyncThunk(
  'institutes/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/institutes/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete institute');
    }
  }
);

const instituteSlice = createSlice({
  name: 'institutes',
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
      .addCase(fetchInstitutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstitutes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || [];
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchInstitutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createInstitute.pending, (state) => { state.actionLoading = true; })
      .addCase(createInstitute.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (action.payload) {
          state.items = [action.payload, ...state.items];
          state.totalElements += 1;
        }
      })
      .addCase(createInstitute.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(updateInstitute.pending, (state) => { state.actionLoading = true; })
      .addCase(updateInstitute.fulfilled, (state, action) => {
        state.actionLoading = false;
        if (action.payload) {
          const index = state.items.findIndex(item => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      })
      .addCase(updateInstitute.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(deleteInstitute.pending, (state) => { state.actionLoading = true; })
      .addCase(deleteInstitute.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalElements = Math.max(0, state.totalElements - 1);
      })
      .addCase(deleteInstitute.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; });
  }
});

export default instituteSlice.reducer;
