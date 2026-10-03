import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';
import { Patent } from '../../types';

interface PatentState {
  items: Patent[];
  allItems: Patent[];
  featuredItems: Patent[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  allLoading: boolean;
  error: string | null;
}

const initialState: PatentState = {
  items: [],
  allItems: [],
  featuredItems: [],
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  pageSize: 10,
  loading: false,
  allLoading: false,
  error: null,
};

export const fetchPatents = createAsyncThunk(
  'patents/fetchList',
  async (params: { search?: string; status?: string; year?: string | number; page?: number; size?: number; sortBy?: string; sortDir?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/patents', { params });
      return response.data?.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch patents');
    }
  }
);

export const fetchAllPatents = createAsyncThunk(
  'patents/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/patents/all');
      return (response.data?.data || []) as Patent[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all patents');
    }
  }
);

export const fetchFeaturedPatents = createAsyncThunk(
  'patents/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/patents/featured');
      return (response.data?.data || []) as Patent[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch featured patents');
    }
  }
);

const patentSlice = createSlice({
  name: 'patents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Paginated
      .addCase(fetchPatents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatents.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        if (payload && Array.isArray(payload.content)) {
          state.items = payload.content;
          state.totalElements = payload.totalElements;
          state.totalPages = payload.totalPages;
          state.pageNumber = payload.pageNumber;
          state.pageSize = payload.pageSize;
        } else if (Array.isArray(payload)) {
          state.items = payload;
          state.totalElements = payload.length;
        }
      })
      .addCase(fetchPatents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // All
      .addCase(fetchAllPatents.pending, (state) => {
        state.allLoading = true;
      })
      .addCase(fetchAllPatents.fulfilled, (state, action) => {
        state.allLoading = false;
        state.allItems = action.payload;
      })
      .addCase(fetchAllPatents.rejected, (state, action) => {
        state.allLoading = false;
        state.error = action.payload as string;
      })
      // Featured
      .addCase(fetchFeaturedPatents.fulfilled, (state, action) => {
        state.featuredItems = action.payload;
      });
  },
});

export default patentSlice.reducer;
