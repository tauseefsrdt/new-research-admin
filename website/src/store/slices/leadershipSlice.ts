import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export interface LeadershipEntity {
  id: number;
  name: string;
  role: string;
  email?: string;
  tag?: string;
  image?: string;
  institution?: string;
  sortOrder?: number;
  status?: string;
}

interface LeadershipState {
  items: LeadershipEntity[];
  loading: boolean;
  error: string | null;
}

const initialState: LeadershipState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchLeaderships = createAsyncThunk(
  'leaderships/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/leaderships/active');
      const data = response.data?.data;
      if (Array.isArray(data) && data.length > 0) return data as LeadershipEntity[];
      const fallback = await api.get('/leaderships', { params: { size: 100 } });
      return (fallback.data?.data?.content || fallback.data?.data || []) as LeadershipEntity[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch leadership records');
    }
  }
);

const leadershipSlice = createSlice({
  name: 'leaderships',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderships.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderships.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLeaderships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default leadershipSlice.reducer;
