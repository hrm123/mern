import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import launchesReducer from '../features/launches/launchesSlice';
import reservationsReducer from '../features/reservations/reservationsSlice';
import planetsReducer from '../features/planets/planetsSlice';
import themeReducer from '../features/theme/themeSlice';
import languageReducer from '../features/language/languageSlice';

const persistConfig = {
  key: 'planetravel',
  storage,
  whitelist: ['theme', 'language', 'reservations', 'planets'], // Only persist these reducers
};

const rootReducer = combineReducers({
  launches: launchesReducer,
  reservations: reservationsReducer,
  planets: planetsReducer,
  theme: themeReducer,
  language: languageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true, // Force true for debugging
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

console.log('Redux Mode:', import.meta.env.MODE);
console.log('DevTools Enabled:', true);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;