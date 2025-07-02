import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Mock async login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    // Dummy user credentials
    if (email === 'randall@novatus.com' && password === '1234') {
      return {
        id: 1,
        name: 'Randall N.',
        email: 'randall@novatus.com',
        roles: ['admin'],
        permissions: ['read:all', 'write:all']
      };
    } else {
      return rejectWithValue('Invalid credentials');
    }
  }
);

// Mock async signup
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }, { rejectWithValue }) => {
    // Replace with real API call
    if (email && password) {
      return { email, roles: ['user'], permissions: [] };
    } else {
      return rejectWithValue('Signup failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const {
  setUser,
  clearUser,
  setAuthLoading,
  setAuthError,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;