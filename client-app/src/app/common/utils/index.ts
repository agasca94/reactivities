import { IActivity, IAttendee } from "../../models/IActivity";
import { IUser } from "../../models/IUser";

export const combineDateAndTime = (date: Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;

    return new Date(dateString + ' ' + timeString);
}

export const setActivityProps = (activity: IActivity, user: IUser | null) => {
    activity.date = new Date(activity.date);

    if (user) {
        activity.isGoing = activity.attendees.some(
            attendee => attendee.username === user.username
        );
        activity.isHost = activity.attendees.some(
            attendee => attendee.username === user.username && attendee.isHost
        );
    }

    return activity;
}

export const createAttendee = (user: IUser): IAttendee => ({
    displayName: user.displayName,
    isHost: false,
    username: user.username,
    image: user.image
});
