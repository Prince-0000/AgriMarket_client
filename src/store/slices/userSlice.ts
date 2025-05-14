import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  pincode: string | null;
}

const initialState: UserState = {
  pincode: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPincode: (state, action: PayloadAction<string>) => {
      state.pincode = action.payload;
    },
    clearPincode: (state) => {
      state.pincode = null;
    },
  },
});

export const { setPincode, clearPincode } = userSlice.actions;
export default userSlice.reducer;
