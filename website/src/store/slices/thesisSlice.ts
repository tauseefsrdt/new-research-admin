import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export interface ThesisEntity {
  id: number;
  srNo?: number;
  rawFacultyInstitute?: string;
  institute?: string;
  department?: string;
  scholarName?: string;
  regNo?: string;
  scholarWithReg?: string;
  supervisors?: string;
  title?: string;
  rawTitle?: string;
  defenseDate?: string;
  academicSession?: string;
  status?: string;
}

interface ThesisState {
  items: ThesisEntity[];
  allItems: ThesisEntity[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  allLoading: boolean;
  error: string | null;
}

const initialState: ThesisState = {
  items: [],
  allItems: [],
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  pageSize: 10,
  loading: false,
  allLoading: false,
  error: null,
};

export const fetchTheses = createAsyncThunk(
  'theses/fetchList',
  async (params: { search?: string; institute?: string; department?: string; session?: string; status?: string; page?: number; size?: number; sortBy?: string; sortDir?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/theses', { params });
      return response.data?.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch theses');
    }
  }
);

export const fetchAllTheses = createAsyncThunk(
  'theses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/theses/all');
      return (response.data?.data || []) as ThesisEntity[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all theses');
    }
  }
);

const thesisSlice = createSlice({
  name: 'theses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTheses.fulfilled, (state, action) => {
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
      .addCase(fetchTheses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllTheses.pending, (state) => {
        state.allLoading = true;
      })
      .addCase(fetchAllTheses.fulfilled, (state, action) => {
        state.allLoading = false;
        state.allItems = action.payload;
      })
      .addCase(fetchAllTheses.rejected, (state, action) => {
        state.allLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default thesisSlice.reducer;
