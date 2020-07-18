export interface IActivity 
{
    id: string;
    title: string;
    description: string;
    date: Date;
    category: string;
    city: string;
    venue: string;
    isGoing: boolean;
    isHost: boolean;
    attendees: IAttendee[];
}

export interface IActivityFormValues extends Partial<IActivity> {
    time?: Date
}

export interface IAttendee {
    username: string;
    displayName: string;
    image?: string;
    isHost: boolean;
}
