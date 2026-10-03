import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchResearchPapers = createAsyncThunk(
  'researchPapers/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/research-papers', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch research papers');
    }
  }
);

export const fetchDepartments = createAsyncThunk(
  'researchPapers/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/research-papers/departments');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch departments');
    }
  }
);

export const createResearchPaper = createAsyncThunk(
  'researchPapers/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/research-papers', data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create research paper');
    }
  }
);

export const updateResearchPaper = createAsyncThunk(
  'researchPapers/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/research-papers/${id}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update research paper');
    }
  }
);

export const deleteResearchPaper = createAsyncThunk(
  'researchPapers/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/research-papers/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete research paper');
    }
  }
);

const researchPaperSlice = createSlice({
  name: 'researchPapers',
  initialState: {
    items: [],
    departments: [],
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
      .addCase(fetchResearchPapers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResearchPapers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || [];
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchResearchPapers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload || [];
      })
      .addCase(createResearchPaper.pending, (state) => { state.actionLoading = true; })
      .addCase(createResearchPaper.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(createResearchPaper.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(updateResearchPaper.pending, (state) => { state.actionLoading = true; })
      .addCase(updateResearchPaper.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updateResearchPaper.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(deleteResearchPaper.pending, (state) => { state.actionLoading = true; })
      .addCase(deleteResearchPaper.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalElements = Math.max(0, state.totalElements - 1);
      })
      .addCase(deleteResearchPaper.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; });
  }
});

export default researchPaperSlice.reducer;
