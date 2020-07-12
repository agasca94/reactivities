import React from 'react';
import { IActivity } from '../../../app/models/IActivity';
import { Segment, Item, Label } from 'semantic-ui-react';
import { ActivityListItem } from './ActivityListItem';

interface IProps {
    activitiesByDate: [string, IActivity[]][];
    selectActivity: (id: string) => void;
}

export const ActivityList: React.FC<IProps> = ({ 
    activitiesByDate, 
    selectActivity,
}) => {
    return (
        <>
        {activitiesByDate.map(([date, activities]) => (
            <React.Fragment key={date}>
                <Label size='large' color='blue'>
                    {date}
                </Label>
                <Item.Group divided>
                    {activities.map(activity => (
                        <ActivityListItem
                            key={activity.id}
                            activity={activity}
                            selectActivity={selectActivity}
                        />
                    ))}
                </Item.Group>   
            </React.Fragment>
        ))}
        </>
    )
}
