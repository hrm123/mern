import { configureStore } from '@reduxjs/toolkit';
import launchesReducer from '../features/launches/launchesSlice';
import reservationsReducer from '../features/reservations/reservationsSlice';
import themeReducer from '../features/theme/themeSlice';
import languageReducer from '../features/language/languageSlice';

export const store = configureStore({
  reducer: {
    launches: launchesReducer,
    reservations: reservationsReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;