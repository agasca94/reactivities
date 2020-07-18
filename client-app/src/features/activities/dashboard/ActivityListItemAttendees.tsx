import React from 'react'
import { List, Popup, Image } from 'semantic-ui-react'
import { IAttendee } from '../../../app/models/IActivity'

interface IProps {
    attendees: IAttendee[];
}

const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
    return (
        <List horizontal>
            {attendees.map(attendee => 
                <List.Item key={attendee.username}>
                    <Popup
                        header={attendee.displayName}
                        trigger={
                            <Image
                                size='mini'
                                circular
                                src={attendee.image || '/assets/user.png'}
                            />
                        }
                    />
                </List.Item>    
            )}
        </List>
    )
}

export default ActivityListItemAttendees;
