
export type AppEvent = {
    id: string
    title: string
    date: string
    time: string
    description: string
    venue: string
    location: string
    hostedBy: string
    hostPhotoURL: string
    attendees: Attendee[]
    

}

export type Attendee = {
    id: string
    name: string
    photoURL: string
}