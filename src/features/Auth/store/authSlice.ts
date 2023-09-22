import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AuthState} from './authTypes';
import {AppUser} from '@shared/types/types';

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AppUser | null>) => {
      state.user = action.payload;
    },
  },
});

export default slice;
