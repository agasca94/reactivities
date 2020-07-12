import React from 'react'
import { Card, Image, Button, Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/IActivity'
import { Link } from 'react-router-dom'
import { ActivityDetailedHeader } from './ActivityDetailedHeader'
import { ActivityDetailedInfo } from './ActivityDetailedInfo'
import { ActivityDetailedChat } from './ActivityDetailedChat'
import { ActivityDetailedSidebar } from './ActivityDetailedSidebar'

interface IProps {
    activity: IActivity;
    close: () => void;
}

export const ActivityDetails: React.FC<IProps> = ({
    activity
}) => {

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar/>
            </Grid.Column>
        </Grid>
    )
}
