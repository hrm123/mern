import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Reservation {
  id: string;
  launchId: string;
  customerName: string;
  email: string;
  phone: string;
}

interface ReservationsState {
  reservations: Reservation[];
}

const initialState: ReservationsState = {
  reservations: [],
};

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<Reservation>) => {
      state.reservations.push(action.payload);
    },
    removeReservation: (state, action: PayloadAction<string>) => {
      state.reservations = state.reservations.filter(
        reservation => reservation.id !== action.payload
      );
    },
  },
});

export const { addReservation, removeReservation } = reservationsSlice.actions;
export default reservationsSlice.reducer;