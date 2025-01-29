import { AppUser } from "../../types/users";
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from "@reduxjs/toolkit";


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
        logIn: {
            reducer: (state, action: PayloadAction<AppUser>) => {
                state.authenticated = true;
                state.currentUser = action.payload
            },
            prepare: (user: User) => {
                const mapped: AppUser = {
                    uid: user.uid,
                    id: user.id,
                    email: user.email,
                    providerId: user.providerData[0].providerId,
                    // firstName: user.firstName,
                    // lastName: user.lastName,
                    // childName: user.childName,
                    // grade: user.grade,
                }
                return { payload: mapped }
            }
        },

        logOut: (state) => {
        state.authenticated = false;
        state.currentUser = null;
        },
    },
});

export const { logIn, logOut } = authSlice.actions;
