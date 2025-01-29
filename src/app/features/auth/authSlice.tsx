import { AppUser } from "../../types/users";
import { createSlice } from '@reduxjs/toolkit';


type State ={
    authenticated: boolean;
    currentUser: AppUser | null;

}
const initialState: State = {
    authenticated: false,
    currentUser: null,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.authenticated = true;
            state.currentUser = {
                email: action.payload.email,
                // password: action.payload.password,
            };
        },
        logOut: (state) => {
            state.authenticated = false;
            state.currentUser = null;
        }
    }

})

export const { logIn, logOut } = authSlice.actions;
