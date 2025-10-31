import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type PlanetsState = {
  planets: string[];
};

const initialState: PlanetsState = {
  planets: ['Planet1', 'Planet2', 'Planet3'],
};

const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    setPlanets(state, action: PayloadAction<string[]>) {
      state.planets = action.payload;
    },
    addPlanet(state, action: PayloadAction<string>) {
      if (!state.planets.includes(action.payload)) {
        state.planets.push(action.payload);
      }
    },
    removePlanet(state, action: PayloadAction<string>) {
      state.planets = state.planets.filter((p) => p !== action.payload);
    },
  },
});

export const { setPlanets, addPlanet, removePlanet } = planetsSlice.actions;
export default planetsSlice.reducer;
