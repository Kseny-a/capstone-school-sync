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
        setLoading: (state) => {
            state.status = 'loading';
        }, 
        setError: (state) => {
            state.status ='error';
        },
        }, 
       });

       export const { success, setLoading, setError } = userSlice.actions;
       export default userSlice.reducer;