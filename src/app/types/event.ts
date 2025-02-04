import { Timestamp } from "firebase/firestore"

export type AppEvent = {
    id ?: string
    title: string
    date: Timestamp | string
    time: string
    description: string
    venue: string
    address: string
    hostedBy: string
    hostUid: string
    hostPhotoURL: string | null
    attendees: Attendee[]
    attendeesIds: string[]
    grade: string
    isCancelled: boolean
}

export type Attendee = {
    id: string
    name: string
    photoURL: string
}