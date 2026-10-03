import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';
import { SearchResults, Patent, ResearchPaper, Book } from '../../types';

interface SearchState {
  results: SearchResults;
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: {
    papers: [],
    indexed: [],
    books: [],
    total: 0,
  },
  loading: false,
  error: null,
};

export const performGlobalSearch = createAsyncThunk(
  'search/perform',
  async (query: string, { rejectWithValue }) => {
    try {
      if (!query.trim()) {
        return { papers: [], indexed: [], books: [], total: 0 };
      }
      const response = await api.get('/search', { params: { q: query } });
      const raw = response.data?.data;
      if (!raw) return { papers: [], indexed: [], books: [], total: 0 };

      // Map backend search result to SearchResults
      const rawPatents: any[] = raw.patents || [];
      const rawIndexed: any[] = raw.researchPapers || [];
      const rawBooks: any[] = raw.books || [];

      const papers: Patent[] = rawPatents.map((p) => ({
        ...p,
        id: p.id || p.srNo,
        authors: p.patenterName || p.authors,
        year: p.yearOfAward || p.year,
        abstract: p.patentNumber || p.abstractText,
      }));

      const indexed: ResearchPaper[] = rawIndexed.map((p) => ({
        ...p,
        id: p.id || p.srNo,
        authors: p.authorName || p.authors,
        departmentKey: p.departmentKey || p.department,
        journal: p.journalName || p.journal,
        year: p.yearOfPublication || p.year,
        abstract: p.issnNumber || p.abstractText,
        doi: p.ugcRecognitionLink || p.doi,
      }));

      const books: Book[] = rawBooks.map((b) => ({
        ...b,
        id: b.id || b.slNo,
        title: b.paperTitle || b.bookOrChapterTitle || b.title || 'Untitled book or chapter',
        authors: b.teacherName || b.authors,
        year: b.yearOfPublication || b.year,
        publisher: b.publisherName || b.publisher,
        abstract: b.bookOrChapterTitle || b.abstractText,
        isbn: b.isbnIssn || b.isbn,
      }));

      return {
        papers,
        indexed,
        books,
        total: (raw.totalPatents || papers.length) + (raw.totalResearchPapers || indexed.length) + (raw.totalBooks || books.length),
      } as SearchResults;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to perform search');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.results = { papers: [], indexed: [], books: [], total: 0 };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performGlobalSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(performGlobalSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(performGlobalSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
