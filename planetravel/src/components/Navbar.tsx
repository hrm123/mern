import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../store/store';
import { setLanguage } from '../features/language/languageSlice';
import i18n from '../i18n/i18n';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang));
    // also inform i18next so translations update immediately
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar bg-base-200">
      <div className="container mx-auto px-4">
        <div className='ml-auto'>
          <a href="/auth/google">sign on</a>
          {/* <a href="/auth/logout">Sign out</a> */}
        </div>
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">PlanetX</Link>
        </div>
        <div className="flex-none gap-4">
          <Link to="/launches" className="btn btn-ghost">{t('navbar.launches')}</Link>
          <Link to="/reservations" className="btn btn-ghost">{t('navbar.reservations')}</Link>
          
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Language Switch */}
          <select
            className="select select-bordered select-sm"
            value={currentLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="en">EN</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;