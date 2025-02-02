import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppEvent } from "../../types/event"

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
                let eventArray: AppEvent[] =[]
                Array.isArray(events) ? eventArray = events : eventArray.push(events)
                const mapped = eventArray.map((e: any) => {
                    return { ...e, date: (new Date(e.date).toDateString()) }; 
            })
            return { payload: mapped }
            },
        }
    }
})

// Action creators are generated for each case reducer function
export const { setEvents } = eventSlice.actions

export default eventSlice.reducer