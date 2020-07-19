import React from 'react'
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/IActivity';
import { Link } from 'react-router-dom';
import moment from 'moment';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface IProps {
    activity: IActivity;
    attendActivity: () => void;
    cancelAttendance: () => void;
    submitting: boolean;
}

export const ActivityDetailedHeader: React.FC<IProps> = ({ 
    activity, 
    submitting,
    cancelAttendance, 
    attendActivity 
}) => {
    const host = activity.attendees.find(
        attendee => attendee.isHost
    );

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image 
                    src={`/assets/categoryImages/${activity.category.toLowerCase()}.jpg`} 
                    fluid 
                    style={activityImageStyle}
                />
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                            <Header
                                size='huge'
                                content={activity.title}
                                style={{ color: 'white' }}
                            />
                            <p>{moment(activity.date).format('dddd Do MMMM')}</p>
                            <p>
                                Hosted by <Link to={`/profile/${host?.username}`}> <strong>{host?.displayName}</strong></Link>
                            </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ? (
                    <Button as={Link} to={`/edit/${activity.id}`} color='orange' floated='right'>
                        Manage Event
                    </Button>
                ) : activity.isGoing ? (
                    <Button loading={submitting} onClick={cancelAttendance}>Cancel attendance</Button>
                ) : (
                    <Button loading={submitting} onClick={attendActivity} color='teal'>Join Activity</Button>
                )}
            </Segment>
        </Segment.Group>
    )
}
