import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { addReservation } from './reservationsSlice';
import { v4 as uuidv4 } from 'uuid';

const ReservationsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const launches = useSelector((state: RootState) => state.launches.launches);
  const reservations = useSelector((state: RootState) => state.reservations.reservations);

  const [formData, setFormData] = useState({
    launchId: launches.length > 0 ? launches[0].id : '',
    customerName: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reservation = {
      id: uuidv4(),
      ...formData,
    };
    dispatch(addReservation(reservation));
    setFormData({ launchId: launches.length > 0 ? launches[0].id : '', customerName: '', email: '', phone: '' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('reservations.title')}</h1>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Select Launch</span></label>
              <select
                className="select select-bordered w-full"
                value={formData.launchId}
                onChange={(e) => setFormData({ ...formData, launchId: e.target.value })}
                required
              >
                {launches.map((l) => (
                  <option key={l.id} value={l.id}>{`${l.planet} - ${new Date(l.date).toLocaleString()}`}</option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">{t('reservations.name')}</span></label>
              <input type="text" className="input input-bordered" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} required />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">{t('reservations.email')}</span></label>
              <input type="email" className="input input-bordered" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">{t('reservations.phone')}</span></label>
              <input type="tel" className="input input-bordered" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
            </div>

            <button className="btn btn-primary w-full" type="submit">{t('reservations.submit')}</button>
          </form>
        </div>
      </div>
      {/* Read-only list of existing reservations */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">{t('Existing Reservations') ?? 'Existing Reservations'}</h2>
        {reservations.length === 0 ? (
          <p className="text-sm text-muted">No reservations yet.</p>
        ) : (
          <div className="space-y-4">
            {reservations.map((r) => {
              const launch = launches.find((l) => l.id === r.launchId);
              return (
                <div key={r.id} className="card bg-base-100 shadow">
                  <div className="card-body">
                    <h3 className="card-title">{r.customerName}</h3>
                    <p className="text-sm">{launch ? `${launch.planet} - ${new Date(launch.date).toLocaleString()}` : 'Launch: Unknown'}</p>
                    <p className="text-sm">Email: {r.email}</p>
                    <p className="text-sm">Phone: {r.phone}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;
