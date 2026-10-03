import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import patentReducer from './slices/patentSlice';
import researchPaperReducer from './slices/researchPaperSlice';
import bookReducer from './slices/bookSlice';
import instituteReducer from './slices/instituteSlice';
import thesisReducer from './slices/thesisSlice';
import phdSupervisorReducer from './slices/phdSupervisorSlice';
import vacantSeatReducer from './slices/vacantSeatSlice';
import rcDocumentReducer from './slices/rcDocumentSlice';
import leadershipReducer from './slices/leadershipSlice';
import patronReducer from './slices/patronSlice';
import galleryReducer from './slices/gallerySlice';
import heroProfileReducer from './slices/heroProfileSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    patents: patentReducer,
    researchPapers: researchPaperReducer,
    books: bookReducer,
    institutes: instituteReducer,
    theses: thesisReducer,
    phdSupervisors: phdSupervisorReducer,
    vacantSeats: vacantSeatReducer,
    rcDocuments: rcDocumentReducer,
    leaderships: leadershipReducer,
    patrons: patronReducer,
    gallery: galleryReducer,
    heroProfiles: heroProfileReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
