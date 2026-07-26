import { createSlice } from '@reduxjs/toolkit';

const getInitialUserInfo = () => {
  try {
    const item = localStorage.getItem('userInfo');
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const initialState = {
  userInfo: getInitialUserInfo(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
