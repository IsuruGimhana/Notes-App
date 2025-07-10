import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin(state, action) {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    userLogout(state) {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;