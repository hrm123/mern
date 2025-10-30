import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from './store/store';
import { store } from './store/store';
import Navbar from './components/Navbar';
import LaunchesPage from './features/launches/LaunchesPage';
import ReservationsPage from './features/reservations/ReservationsPage';
import { setTheme } from './features/theme/themeSlice';
import './i18n/i18n';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeSync />
        <div className="min-h-screen bg-base-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<LaunchesPage />} />
              <Route path="/launches" element={<LaunchesPage />} />
              <Route path="/reservations" element={<ReservationsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

function ThemeSync() {
  const dispatch = useDispatch();
  const isDark = useSelector((s: RootState) => s.theme.isDarkMode);

  // initialize from localStorage once
  useEffect(() => {
    try {
      const saved = localStorage.getItem('planetx-theme');
      if (saved !== null) {
        const parsed = saved === 'dark';
        if (parsed !== isDark) {
          dispatch(setTheme(parsed));
        }
        document.documentElement.setAttribute('data-theme', parsed ? 'dark' : 'light');
      } else {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('planetx-theme', isDark ? 'dark' : 'light');
      }
    } catch {
      // ignore (e.g., localStorage not available)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist changes
  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      localStorage.setItem('planetx-theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDark]);

  return null;
}

export default App;
