import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppEvent } from "../../types/event"
import { Timestamp } from "firebase/firestore"
import { auth } from "../../api/config/firebase"

type State = {
    events: AppEvent[]
    attendeesIds: string[]
}

const initialState: State = {
    events: [],
    attendeesIds: [],
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
                            : new Date(e.date).toDateString(), //  Convert normal date
                            isHost: auth.currentUser?.uid === e.hostUid,
                            isGoing:(e.attendeesIds || []).includes(auth.currentUser?.uid),
                        }; 
                    });return { payload: mapped };
            },
        }
    }
})

// Action creators are generated for each case reducer function
export const { setEvents } = eventSlice.actions

export default eventSlice.reducer