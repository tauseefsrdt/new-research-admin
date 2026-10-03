import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchRcDocuments = createAsyncThunk(
  'rcDocuments/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/rc-documents', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch RC documents');
    }
  }
);

export const createRcDocument = createAsyncThunk(
  'rcDocuments/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/rc-documents', data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create RC document');
    }
  }
);

export const updateRcDocument = createAsyncThunk(
  'rcDocuments/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/rc-documents/${id}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update RC document');
    }
  }
);

export const deleteRcDocument = createAsyncThunk(
  'rcDocuments/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/rc-documents/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete RC document');
    }
  }
);

const rcDocumentSlice = createSlice({
  name: 'rcDocuments',
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
      .addCase(fetchRcDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRcDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || [];
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchRcDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createRcDocument.pending, (state) => { state.actionLoading = true; })
      .addCase(createRcDocument.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(createRcDocument.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(updateRcDocument.pending, (state) => { state.actionLoading = true; })
      .addCase(updateRcDocument.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updateRcDocument.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(deleteRcDocument.pending, (state) => { state.actionLoading = true; })
      .addCase(deleteRcDocument.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalElements = Math.max(0, state.totalElements - 1);
      })
      .addCase(deleteRcDocument.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; });
  }
});

export default rcDocumentSlice.reducer;
