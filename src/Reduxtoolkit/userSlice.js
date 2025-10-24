import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    currentUser: null,
    language: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signupUser: (state, action) => {
            const { email, password, language } = action.payload;

            const exists = state.users.find(u => u.email === email);
            if (exists) {
                throw new Error('User already exists');
            }

            const newUser = { email, password, language };
            state.users.push(newUser);

            state.currentUser = email;
            state.language = language;
            state.isAuthenticated = true;
        },


        loginUser: (state, action) => {
            const { email, password } = action.payload;
            const user = state.users.find(u => u.email === email && u.password === password);

            if (!user) throw new Error('Invalid Email Or password');

            state.currentUser = email;
            state.language = user.language;
            state.isAuthenticated = true;
        },

        logoutUser: (state) => {
            state.currentUser = null;
            state.language = null;
            state.isAuthenticated = false;
        },

    },
});

export const { signupUser, loginUser, logoutUser, } = userSlice.actions;
export default userSlice.reducer;
