import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { ActivityDetailedHeader } from './ActivityDetailedHeader';
import { ActivityDetailedInfo } from './ActivityDetailedInfo';
import { ActivityDetailedChat } from './ActivityDetailedChat';
import { ActivityDetailedSidebar } from './ActivityDetailedSidebar';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { useParams } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';

const ActivityDetails = () => {
    const rootStore = useContext(RootStoreContext);
    const { 
        activity, 
        loadActivity,
        loadingInitial,
        cancelAttendance,
        attendActivity,
        submitting
    } = rootStore.activityStore;

    const { id } = useParams();

    React.useEffect(() => {
        loadActivity(id);
    }, [loadActivity, id]);

    if (loadingInitial) return <LoadingComponent content='Loading activity...'/>;

    if (!activity) return <h2>Activity not found!</h2>
    console.log('render')
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader 
                    submitting={submitting}
                    activity={activity}
                    cancelAttendance={cancelAttendance}
                    attendActivity={attendActivity}
                />
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar attendees={activity.attendees}/>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails);
