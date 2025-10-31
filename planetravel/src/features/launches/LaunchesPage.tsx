import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { addLaunch } from './launchesSlice';
import type { Launch } from './launchesSlice';
import { v4 as uuidv4 } from 'uuid';


const LaunchesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const launches = useSelector((state: RootState) => state.launches.launches);
  const planets = useSelector((state: RootState) => state.planets?.planets ?? ['Planet1', 'Planet2', 'Planet3']);

  const [formData, setFormData] = useState({
    planet: planets[0] ?? 'Planet1',
    date: '',
    availableSeats: 0,
    price: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLaunch: Launch = {
      id: uuidv4(),
      ...formData,
    };
    dispatch(addLaunch(newLaunch));
    setFormData({
      planet: planets[0] ?? 'Planet1',
      date: '',
      availableSeats: 0,
      price: 0,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t('launches.title')}</h1>
      
      {/* Create Launch Form */}
      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">{t('launches.createLaunch')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t('launches.planet')}</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.planet}
                onChange={(e) => setFormData({ ...formData, planet: e.target.value })}
              >
                {planets.map((planet) => (
                  <option key={planet} value={planet}>{planet}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{t('launches.date')}</span>
              </label>
              <input
                type="datetime-local"
                className="input input-bordered"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{t('launches.seats')}</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                value={formData.availableSeats}
                onChange={(e) => setFormData({ ...formData, availableSeats: parseInt(e.target.value) })}
                min="1"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{t('launches.price')}</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                min="0"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              {t('launches.submit')}
            </button>
          </form>
        </div>
      </div>

      {/* Launches List */}
      <div className="space-y-4">
        {launches.map((launch) => (
          <div key={launch.id} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{launch.planet}</h2>
              <p>Date: {new Date(launch.date).toLocaleString()}</p>
              <p>Available Seats: {launch.availableSeats}</p>
              <p>Price: ${launch.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaunchesPage;