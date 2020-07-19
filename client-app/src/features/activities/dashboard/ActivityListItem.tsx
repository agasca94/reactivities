import React from 'react'
import { Item, Button, Segment, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { IActivity } from '../../../app/models/IActivity'
import moment from 'moment'
import ActivityListItemAttendees from './ActivityListItemAttendees'

interface IProps {
    activity: IActivity;
    selectActivity: (id: string) => void;
}

export const ActivityListItem: React.FC<IProps> = ({
    activity,
    selectActivity
}) => {
    const host = activity.attendees.find(attendee => attendee.isHost);

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image 
                            size='tiny' 
                            circular 
                            src={host?.image || '/assets/user.png'}
                            style={{ marginBotton: 3 }}
                        />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                            <Item.Description>
                                Hosted by <Link to={`/profile/${host?.username}`}> {host?.displayName}</Link>
                            </Item.Description>
                            {activity.isHost && 
                                <Item.Description>
                                    <Label
                                        basic color='orange'
                                        content='You are hosting this activity'
                                    />
                                </Item.Description>
                            }
                            {activity.isGoing && !activity.isHost &&
                                <Item.Description>
                                    <Label
                                        basic color='green'
                                        content='You are going to this activity'
                                    />
                                </Item.Description>
                            }
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock'/> {moment(activity.date).format('h:mm a')} 
                <Icon name='marker'/> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendees attendees={activity.attendees}/>
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    as={Link}
                    to={`/activities/${activity.id}`}
                    onClick={() => selectActivity(activity.id)} 
                    floated='right' 
                    content='View' 
                    color='blue'
                />
            </Segment>
        </Segment.Group>
    )
}
