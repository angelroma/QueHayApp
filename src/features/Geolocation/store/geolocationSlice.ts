// features/geolocation/geolocationSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GeolocationState {
  location: {latitude: number; longitude: number} | null;
  address: string | null;
}

const initialState: GeolocationState = {
  location: null,
  address: null,
};

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    setLocation: (
      state,
      action: PayloadAction<{latitude: number; longitude: number}>,
    ) => {
      state.location = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});

export const {setLocation, setAddress} = geolocationSlice.actions;
export default geolocationSlice;
