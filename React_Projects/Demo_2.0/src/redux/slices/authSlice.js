import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    signIn, 
    signUp, 
    resetPassword, 
    signInWithGoogleAuth 
} from '../../config/firebaseConfig.js';

// Utility function to serialize user data
const serializeUser = (user) => {
    if (!user) return null;
    
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        // Add any other non-sensitive, serializable fields you want to store
        metadata: {
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime
        }
    };
};

// Async Thunks for Authentication
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signIn(email, password);
            return serializeUser(userCredential.user);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password, ...additionalData }, { rejectWithValue }) => {
        try {
            const userCredential = await signUp(email, password, additionalData);
            return serializeUser(userCredential.user);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const googleSignIn = createAsyncThunk(
    'auth/googleSignIn',
    async (_, { rejectWithValue }) => {
        try {
            const result = await signInWithGoogleAuth();
            return serializeUser(result.user);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email, { rejectWithValue }) => {
        try {
            await resetPassword(email);
            return 'Password reset email sent';
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Authentication Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login Reducers
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Google Sign-In Reducers
            .addCase(googleSignIn.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(googleSignIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(googleSignIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Registration Reducers
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;