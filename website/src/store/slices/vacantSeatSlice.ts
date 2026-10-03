import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export interface VacantSeatEntity {
  id: number;
  rowIndex?: number;
  institute: string;
  rawInstitute?: string;
  department: string;
  rawDepartment?: string;
  totalPhD?: number;
  rawTotalPhD?: number;
  supervisorName: string;
  rawSupervisorName?: string;
  designation?: string;
  rawDesignation?: string;
  designationSeatLimit?: number;
  allottedSeat?: number;
  noOfVacant: number;
  status?: string;
}

interface VacantSeatState {
  items: VacantSeatEntity[];
  allItems: VacantSeatEntity[];
  instituteSeats: VacantSeatEntity[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  allLoading: boolean;
  error: string | null;
}

const initialState: VacantSeatState = {
  items: [],
  allItems: [],
  instituteSeats: [],
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  pageSize: 10,
  loading: false,
  allLoading: false,
  error: null,
};

export const fetchVacantSeats = createAsyncThunk(
  'vacantSeats/fetchList',
  async (params: { search?: string; institute?: string; department?: string; status?: string; page?: number; size?: number; sortBy?: string; sortDir?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/vacant-seats', { params });
      return response.data?.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch vacant seats');
    }
  }
);

export const fetchAllVacantSeats = createAsyncThunk(
  'vacantSeats/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/vacant-seats/all');
      return (response.data?.data || []) as VacantSeatEntity[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all vacant seats');
    }
  }
);

export const fetchVacantSeatsByInstitute = createAsyncThunk(
  'vacantSeats/fetchByInstitute',
  async (institute: string, { rejectWithValue }) => {
    try {
      const response = await api.get('/vacant-seats/by-institute', { params: { institute } });
      return (response.data?.data || []) as VacantSeatEntity[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch vacant seats by institute');
    }
  }
);

const vacantSeatSlice = createSlice({
  name: 'vacantSeats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacantSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacantSeats.fulfilled, (state, action) => {
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
      .addCase(fetchVacantSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllVacantSeats.pending, (state) => {
        state.allLoading = true;
      })
      .addCase(fetchAllVacantSeats.fulfilled, (state, action) => {
        state.allLoading = false;
        state.allItems = action.payload;
      })
      .addCase(fetchAllVacantSeats.rejected, (state, action) => {
        state.allLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchVacantSeatsByInstitute.fulfilled, (state, action) => {
        state.instituteSeats = action.payload;
      });
  },
});

export default vacantSeatSlice.reducer;
