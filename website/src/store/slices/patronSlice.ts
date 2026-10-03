import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export interface PatronEntity {
  id: number;
  name: string;
  role: string;
  image?: string;
  type: string; // 'PATRON' | 'CO_PATRON'
  sortOrder?: number;
  status?: string;
}

interface PatronState {
  items: PatronEntity[];
  patrons: PatronEntity[];
  coPatrons: PatronEntity[];
  loading: boolean;
  error: string | null;
}

const initialState: PatronState = {
  items: [],
  patrons: [],
  coPatrons: [],
  loading: false,
  error: null,
};

export const fetchPatrons = createAsyncThunk(
  'patrons/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/patrons', { params: { size: 100 } });
      const raw = response.data?.data;
      const list: PatronEntity[] = Array.isArray(raw?.content) ? raw.content : Array.isArray(raw) ? raw : [];
      return list;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch patrons');
    }
  }
);

export const fetchPatronsByType = createAsyncThunk(
  'patrons/fetchByType',
  async (type: 'PATRON' | 'CO_PATRON', { rejectWithValue }) => {
    try {
      const response = await api.get(`/patrons/type/${type}`);
      return { type, data: (response.data?.data || []) as PatronEntity[] };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || `Failed to fetch ${type}`);
    }
  }
);

const patronSlice = createSlice({
  name: 'patrons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatrons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatrons.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.patrons = action.payload.filter((p) => p.type === 'PATRON' || !p.type);
        state.coPatrons = action.payload.filter((p) => p.type === 'CO_PATRON');
      })
      .addCase(fetchPatrons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPatronsByType.fulfilled, (state, action) => {
        if (action.payload.type === 'PATRON') {
          state.patrons = action.payload.data;
        } else if (action.payload.type === 'CO_PATRON') {
          state.coPatrons = action.payload.data;
        }
      });
  },
});

export default patronSlice.reducer;
