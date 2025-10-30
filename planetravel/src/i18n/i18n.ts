import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        launches: 'Launches',
        reservations: 'Reservations',
      },
      launches: {
        title: 'Space Launches',
        createLaunch: 'Create Launch',
        planet: 'Planet',
        date: 'Launch Date',
        seats: 'Available Seats',
        price: 'Price',
        submit: 'Submit',
      },
      reservations: {
        title: 'Make a Reservation',
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone Number',
        submit: 'Book Now',
      },
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        success: 'Success!',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;