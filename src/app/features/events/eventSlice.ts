import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppEvent } from "../../types/event"
import { Timestamp } from "firebase/firestore"

type State = {
    events: AppEvent[]
}

const initialState: State = {
    events: []
}

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {

        setEvents: {
            reducer: (state, action: PayloadAction<AppEvent[]>) => {
            state.events = action.payload
            },
            prepare: (events: any) => {
                let eventArray = Array.isArray(events) ? events : [events];

                const mapped = eventArray.map((e) => {
                    return { 
                        ...e, 
                        date: e.date instanceof Timestamp 
                            ? e.date.toDate().toDateString()  //  Convert to Firestore Timestamp
                            : new Date(e.date).toDateString() //  Convert normal date
                        }; 
                    });return { payload: mapped };
            },
        }
    }
})

// Action creators are generated for each case reducer function
export const { setEvents } = eventSlice.actions

export default eventSlice.reducer