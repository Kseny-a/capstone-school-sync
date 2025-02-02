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
    hostPhotoURL: string
    attendees: Attendee[]
    grade: string
}

export type Attendee = {
    id: string
    name: string
    photoURL: string
}