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
    activity: IActivity
}

export const ActivityDetailedHeader: React.FC<IProps> = ({activity}) => {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image 
                    src={`/assets/categoryImages/${activity.category}.jpg`} 
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
                                Hosted by <strong>Bob</strong>
                            </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/edit/${activity.id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
}
