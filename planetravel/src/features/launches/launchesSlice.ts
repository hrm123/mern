import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Launch {
  id: string;
  planet: string;
  date: string;
  availableSeats: number;
  price: number;
}

interface LaunchesState {
  launches: Launch[];
}

const initialState: LaunchesState = {
  launches: [],
};

export const launchesSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {
    addLaunch: (state, action: PayloadAction<Launch>) => {
      state.launches.push(action.payload);
    },
    updateLaunch: (state, action: PayloadAction<Launch>) => {
      const index = state.launches.findIndex(launch => launch.id === action.payload.id);
      if (index !== -1) {
        state.launches[index] = action.payload;
      }
    },
    removeLaunch: (state, action: PayloadAction<string>) => {
      state.launches = state.launches.filter(launch => launch.id !== action.payload);
    },
  },
});

export const { addLaunch, updateLaunch, removeLaunch } = launchesSlice.actions;
export default launchesSlice.reducer;