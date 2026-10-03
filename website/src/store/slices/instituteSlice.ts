import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export interface InstituteEntity {
  id: number;
  slug: string;
  title: string;
  code: string;
  departmentCountLabel?: string;
  image?: string;
  description?: string;
  programsJson?: string;
  phdYearwiseDeptCodesJson?: string;
  paperCodesJson?: string;
  patentCodesJson?: string;
  bookCodesJson?: string;
  sortOrder?: number;
  status?: string;
}

interface InstituteState {
  items: InstituteEntity[];
  selectedInstitute: InstituteEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: InstituteState = {
  items: [],
  selectedInstitute: null,
  loading: false,
  error: null,
};

export const fetchInstitutes = createAsyncThunk(
  'institutes/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/institutes/all');
      return (response.data?.data || []) as InstituteEntity[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch institutes');
    }
  }
);

export const fetchInstituteBySlug = createAsyncThunk(
  'institutes/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/institutes/slug/${slug}`);
      return response.data?.data as InstituteEntity;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch institute by slug');
    }
  }
);

const instituteSlice = createSlice({
  name: 'institutes',
  initialState,
  reducers: {
    clearSelectedInstitute: (state) => {
      state.selectedInstitute = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstitutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstitutes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchInstitutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchInstituteBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInstituteBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedInstitute = action.payload;
      })
      .addCase(fetchInstituteBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedInstitute } = instituteSlice.actions;
export default instituteSlice.reducer;
