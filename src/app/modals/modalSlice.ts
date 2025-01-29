import{ createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
    open: boolean;
    type: string | null;
    data: any;
}
const initialState: State = {
    open: false,
    type: null,
    data: null,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ type: string; data: any }>) => {
            state.type = action.payload.type;
            state.open = true;
            state.data = action.payload.data;

        },
        closeModal: (state) =>{
            state.type = null;
            state.open = false;
            state.data = null;

        },
    },
});
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;