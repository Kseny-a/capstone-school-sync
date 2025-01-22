declare module '../../api/sampleData'
    export const sampleData: Array <{
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
    }>;