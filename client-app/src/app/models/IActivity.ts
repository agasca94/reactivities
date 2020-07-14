export interface IActivity 
{
    id: string,
    title: string,
    description: string,
    date: Date,
    category: string,
    city: string,
    venue: string
}

export interface IActivityFormValues extends Partial<IActivity> {
    time?: Date
}
