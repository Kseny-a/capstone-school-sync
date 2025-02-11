import { Profile } from "../../types/profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type State = {
    data: Profile[];
    status: 'idle' | 'loading' | 'finished' | 'error';
}


const initialState: State = {
    data: [],
    status: 'idle',
}

const userSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
       success: {
        reducer: (state, action: PayloadAction<Profile[]>) => {
            state.data = action.payload;
            state.status = 'finished';
        },
        prepare: (profiles: Profile | Profile[]) => {
            let profileArray: Profile[] = [];
            Array.isArray(profiles) ? profileArray = profiles : profileArray.push(profiles);
             return { payload: profileArray};
            // return { payload: Array.isArray(profiles) ? profiles : [profiles] };
            },
        },
        updateProfile: {
            // reducer: (state, action: PayloadAction<Profile>) => {
            //     const index = state.data.findIndex(profile => profile.uid === action.payload.uid);
            //     if (index !== -1) {
            //         state.data[index] = action.payload;
            //     } else {
            //         console.error('Profile not found in state:', action.payload.uid);
            //     }
            // },
            reducer: (state, action: PayloadAction<Profile>) => {
                state.data = state.data.map(profile => 
                    profile.uid === action.payload.uid ? { ...profile, ...action.payload } : profile
                );
            },

            prepare: (profile: Profile) => {
                return { payload: profile };
            }
        },

        setLoading: (state) => {
            state.status = 'loading';
        }, 
        setError: (state) => {
            state.status ='error';
        },
        }, 
       });

       export const { success, setLoading, setError, updateProfile } = userSlice.actions;
       export default userSlice.reducer;