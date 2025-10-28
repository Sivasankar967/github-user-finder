import { configureStore, createSlice } from '@reduxjs/toolkit';

// Redux Slice
const githubSlice = createSlice({
  name: 'github',
  initialState: {
    userData: null,
    repos: [],
    loading: false,
    error: null,
    currentTab: 0,
    page: 1,
    hasMore: true
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.error = null;
    },
    setRepos: (state, action) => {
      state.repos = action.payload;
    },
    appendRepos: (state, action) => {
      state.repos = [...state.repos, ...action.payload];
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    resetState: (state) => {
      state.userData = null;
      state.repos = [];
      state.error = null;
      state.page = 1;
      state.hasMore = true;
    }
  }
});

export const {
  setLoading,
  setUserData,
  setRepos,
  appendRepos,
  setError,
  setCurrentTab,
  setPage,
  setHasMore,
  resetState
} = githubSlice.actions;

// Configure Store
const store = configureStore({
  reducer: {
    github: githubSlice.reducer
  }
});

export default store;