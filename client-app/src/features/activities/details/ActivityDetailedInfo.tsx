import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/IActivity'
import moment from 'moment'

interface IProps {
    activity: IActivity
}

export const ActivityDetailedInfo: React.FC<IProps> = ({activity}) => {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                    <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                    <p>{activity.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                            {moment(activity.date).format('dddd Do MMMM')} at 
                            {moment(activity.date).format('h:mm a')}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>

            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{activity.venue}, {activity.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
}
