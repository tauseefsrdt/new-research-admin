import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export interface RcDocumentEntity {
  id: number;
  docKey?: string;
  title: string;
  filename: string;
  category: string;
  description?: string;
  fileType?: string;
  fileSize?: string;
  path: string;
  status?: string;
}

interface RcDocumentState {
  items: RcDocumentEntity[];
  activeItems: RcDocumentEntity[];
  allItems: RcDocumentEntity[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  activeLoading: boolean;
  error: string | null;
}

const initialState: RcDocumentState = {
  items: [],
  activeItems: [],
  allItems: [],
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  pageSize: 10,
  loading: false,
  activeLoading: false,
  error: null,
};

export const fetchRcDocuments = createAsyncThunk(
  'rcDocuments/fetchList',
  async (params: { search?: string; category?: string; status?: string; page?: number; size?: number; sortBy?: string; sortDir?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/rc-documents', { params });
      return response.data?.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch RC documents');
    }
  }
);

export const fetchActiveRcDocuments = createAsyncThunk(
  'rcDocuments/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/rc-documents/active');
      const data = response.data?.data;
      if (Array.isArray(data)) return data as RcDocumentEntity[];
      // If empty or null, fallback to /all
      const fallback = await api.get('/rc-documents/all');
      return (fallback.data?.data || []) as RcDocumentEntity[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch active RC documents');
    }
  }
);

const rcDocumentSlice = createSlice({
  name: 'rcDocuments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRcDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRcDocuments.fulfilled, (state, action) => {
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
      .addCase(fetchRcDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchActiveRcDocuments.pending, (state) => {
        state.activeLoading = true;
      })
      .addCase(fetchActiveRcDocuments.fulfilled, (state, action) => {
        state.activeLoading = false;
        state.activeItems = action.payload;
      })
      .addCase(fetchActiveRcDocuments.rejected, (state, action) => {
        state.activeLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default rcDocumentSlice.reducer;
