import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  role: string | null;
  roleId: string | null;
  token: string | null;
}

const initialState: AuthState = {
  role: null,
  roleId: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{ role: string; roleId: string; token: string }>
    ) => {
      state.role = action.payload.role;
      state.roleId = action.payload.roleId;
      state.token = action.payload.token;
    },
    clearAuth: (state) => {
      state.role = null;
      state.roleId = null;
      state.token = null;
    },
  },
});

export const { setAuthData, clearAuth } = authSlice.actions;
export default authSlice.reducer;
