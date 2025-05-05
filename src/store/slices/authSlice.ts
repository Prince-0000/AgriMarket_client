// store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  role: string | null | undefined;
}

const initialState: AuthState = {
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<{token: string; role: string}>) {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    clearAuthData(state) {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;