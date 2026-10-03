import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export interface PhdSupervisorEntity {
  id: number;
  departmentCode?: string;
  departmentName?: string;
  instituteSlug?: string;
  supervisor: string;
  yearlyJson?: string;
  grandTotal?: number;
  status?: string;
}

interface PhdSupervisorState {
  items: PhdSupervisorEntity[];
  allItems: PhdSupervisorEntity[];
  instituteSupervisors: PhdSupervisorEntity[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  allLoading: boolean;
  error: string | null;
}

const initialState: PhdSupervisorState = {
  items: [],
  allItems: [],
  instituteSupervisors: [],
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  pageSize: 10,
  loading: false,
  allLoading: false,
  error: null,
};

export const fetchPhdSupervisors = createAsyncThunk(
  'phdSupervisors/fetchList',
  async (params: { search?: string; deptCode?: string; instituteSlug?: string; status?: string; page?: number; size?: number; sortBy?: string; sortDir?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/phd-supervisors', { params });
      return response.data?.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch PhD supervisors');
    }
  }
);

export const fetchAllPhdSupervisors = createAsyncThunk(
  'phdSupervisors/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/phd-supervisors/all');
      return (response.data?.data || []) as PhdSupervisorEntity[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all PhD supervisors');
    }
  }
);

export const fetchPhdSupervisorsByInstitute = createAsyncThunk(
  'phdSupervisors/fetchByInstitute',
  async (instituteSlug: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/phd-supervisors/by-institute/${instituteSlug}`);
      return (response.data?.data || []) as PhdSupervisorEntity[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch PhD supervisors for institute');
    }
  }
);

const phdSupervisorSlice = createSlice({
  name: 'phdSupervisors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhdSupervisors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhdSupervisors.fulfilled, (state, action) => {
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
      .addCase(fetchPhdSupervisors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllPhdSupervisors.pending, (state) => {
        state.allLoading = true;
      })
      .addCase(fetchAllPhdSupervisors.fulfilled, (state, action) => {
        state.allLoading = false;
        state.allItems = action.payload;
      })
      .addCase(fetchAllPhdSupervisors.rejected, (state, action) => {
        state.allLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPhdSupervisorsByInstitute.fulfilled, (state, action) => {
        state.instituteSupervisors = action.payload;
      });
  },
});

export default phdSupervisorSlice.reducer;
