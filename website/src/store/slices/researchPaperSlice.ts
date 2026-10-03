import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';
import { ResearchPaper, Department } from '../../types';

interface ResearchPaperState {
  items: ResearchPaper[];
  allItems: ResearchPaper[];
  featuredItems: ResearchPaper[];
  departments: Department[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  allLoading: boolean;
  departmentsLoading: boolean;
  error: string | null;
}

const initialState: ResearchPaperState = {
  items: [],
  allItems: [],
  featuredItems: [],
  departments: [],
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  pageSize: 10,
  loading: false,
  allLoading: false,
  departmentsLoading: false,
  error: null,
};

export const fetchResearchPapers = createAsyncThunk(
  'researchPapers/fetchList',
  async (params: { search?: string; status?: string; department?: string; year?: string | number; page?: number; size?: number; sortBy?: string; sortDir?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/research-papers', { params });
      return response.data?.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch research papers');
    }
  }
);

export const fetchAllResearchPapers = createAsyncThunk(
  'researchPapers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/research-papers/all');
      return (response.data?.data || []) as ResearchPaper[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all research papers');
    }
  }
);

export const fetchFeaturedResearchPapers = createAsyncThunk(
  'researchPapers/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/research-papers/featured');
      return (response.data?.data || []) as ResearchPaper[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch featured research papers');
    }
  }
);

export const fetchDepartmentCounts = createAsyncThunk(
  'researchPapers/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/research-papers/departments');
      const raw = response.data?.data || [];
      return raw.map((d: any) => ({
        key: d.department || d.key || '',
        name: d.department || d.name || '',
        count: d.count || 0,
      })) as Department[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch department counts');
    }
  }
);

const researchPaperSlice = createSlice({
  name: 'researchPapers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Paginated
      .addCase(fetchResearchPapers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResearchPapers.fulfilled, (state, action) => {
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
      .addCase(fetchResearchPapers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // All
      .addCase(fetchAllResearchPapers.pending, (state) => {
        state.allLoading = true;
      })
      .addCase(fetchAllResearchPapers.fulfilled, (state, action) => {
        state.allLoading = false;
        state.allItems = action.payload;
      })
      .addCase(fetchAllResearchPapers.rejected, (state, action) => {
        state.allLoading = false;
        state.error = action.payload as string;
      })
      // Featured
      .addCase(fetchFeaturedResearchPapers.fulfilled, (state, action) => {
        state.featuredItems = action.payload;
      })
      // Departments
      .addCase(fetchDepartmentCounts.pending, (state) => {
        state.departmentsLoading = true;
      })
      .addCase(fetchDepartmentCounts.fulfilled, (state, action) => {
        state.departmentsLoading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartmentCounts.rejected, (state) => {
        state.departmentsLoading = false;
      });
  },
});

export default researchPaperSlice.reducer;
