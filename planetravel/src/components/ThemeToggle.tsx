import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { toggleTheme } from '../features/theme/themeSlice';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((s: RootState) => s.theme.isDarkMode);

  const handleClick = () => {
    const newTheme = !isDark;
    // eslint-disable-next-line no-debugger
    debugger;
    // update redux
    dispatch(toggleTheme());
    // immediately apply to document and persist so UI updates instantly
    try {
      document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
      localStorage.setItem('planetx-theme', newTheme ? 'dark' : 'light');
    } catch {
      // ignore
    }
  };

  return (
    <button
      aria-label="Toggle theme"
      className="btn btn-circle btn-ghost"
      onClick={handleClick}
      title={isDark ? 'Switch to day' : 'Switch to night'}
    >
      {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
