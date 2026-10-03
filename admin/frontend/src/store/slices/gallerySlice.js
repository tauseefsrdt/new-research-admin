import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchGallery = createAsyncThunk(
  'gallery/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/gallery-images', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch gallery images');
    }
  }
);

export const createGalleryImage = createAsyncThunk(
  'gallery/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/gallery-images', data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create gallery image');
    }
  }
);

export const updateGalleryImage = createAsyncThunk(
  'gallery/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/gallery-images/${id}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update gallery image');
    }
  }
);

export const deleteGalleryImage = createAsyncThunk(
  'gallery/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/gallery-images/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete gallery image');
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
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
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || [];
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGalleryImage.pending, (state) => { state.actionLoading = true; })
      .addCase(createGalleryImage.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(createGalleryImage.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(updateGalleryImage.pending, (state) => { state.actionLoading = true; })
      .addCase(updateGalleryImage.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updateGalleryImage.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; })
      .addCase(deleteGalleryImage.pending, (state) => { state.actionLoading = true; })
      .addCase(deleteGalleryImage.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.totalElements = Math.max(0, state.totalElements - 1);
      })
      .addCase(deleteGalleryImage.rejected, (state, action) => { state.actionLoading = false; state.error = action.payload; });
  }
});

export default gallerySlice.reducer;
