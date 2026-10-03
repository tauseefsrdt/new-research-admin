import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export interface GalleryImageEntity {
  id: number;
  src: string;
  alt?: string;
  caption?: string;
  category?: string;
  sortOrder?: number;
  status?: string;
}

interface GalleryState {
  items: GalleryImageEntity[];
  loading: boolean;
  error: string | null;
}

const initialState: GalleryState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchGalleryImages = createAsyncThunk(
  'gallery/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/gallery-images/active');
      const data = response.data?.data;
      if (Array.isArray(data) && data.length > 0) return data as GalleryImageEntity[];
      const fallback = await api.get('/gallery-images', { params: { size: 100 } });
      return (fallback.data?.data?.content || fallback.data?.data || []) as GalleryImageEntity[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch gallery images');
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryImages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGalleryImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default gallerySlice.reducer;
