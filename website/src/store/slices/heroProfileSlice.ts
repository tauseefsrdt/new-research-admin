import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export interface HeroProfileEntity {
  id: number;
  profileKey: string;
  label?: string;
  title: string;
  designation?: string;
  image?: string;
  excerpt?: string;
  fullContentJson?: string;
  status?: string;
}

interface HeroProfileState {
  items: HeroProfileEntity[];
  activeProfile: HeroProfileEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: HeroProfileState = {
  items: [],
  activeProfile: null,
  loading: false,
  error: null,
};

export const fetchHeroProfiles = createAsyncThunk(
  'heroProfiles/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/hero-profiles');
      return (response.data?.data || []) as HeroProfileEntity[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch hero profiles');
    }
  }
);

export const fetchHeroProfileByKey = createAsyncThunk(
  'heroProfiles/fetchByKey',
  async (key: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/hero-profiles/key/${key}`);
      return response.data?.data as HeroProfileEntity;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch hero profile by key');
    }
  }
);

const heroProfileSlice = createSlice({
  name: 'heroProfiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchHeroProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchHeroProfileByKey.fulfilled, (state, action) => {
        state.activeProfile = action.payload;
      });
  },
});

export default heroProfileSlice.reducer;
