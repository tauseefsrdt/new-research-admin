import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import patentReducer from './slices/patentSlice';
import researchPaperReducer from './slices/researchPaperSlice';
import bookReducer from './slices/bookSlice';
import instituteReducer from './slices/instituteSlice';
import vacantSeatReducer from './slices/vacantSeatSlice';
import thesisReducer from './slices/thesisSlice';
import phdSupervisorReducer from './slices/phdSupervisorSlice';
import rcDocumentReducer from './slices/rcDocumentSlice';
import leadershipReducer from './slices/leadershipSlice';
import patronReducer from './slices/patronSlice';
import galleryReducer from './slices/gallerySlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    patents: patentReducer,
    researchPapers: researchPaperReducer,
    books: bookReducer,
    institutes: instituteReducer,
    vacantSeats: vacantSeatReducer,
    theses: thesisReducer,
    phdSupervisors: phdSupervisorReducer,
    rcDocuments: rcDocumentReducer,
    leaderships: leadershipReducer,
    patrons: patronReducer,
    gallery: galleryReducer,
    search: searchReducer,
  },
});

export default store;
