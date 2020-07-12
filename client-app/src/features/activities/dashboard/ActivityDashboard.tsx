import React from 'react'
import { Grid } from 'semantic-ui-react'
import { ActivityList } from './ActivityList'
import { useContext } from 'react';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

const ActivityDashboard = () => {
    const activityStore = useContext(ActivityStore);
    const { 
        activitiesByDate: activities,
        selectActivity, 
        loadActivities,
        loadingInitial,
        deleteActivity,
        submitting,
        target,
    } = activityStore;

    React.useEffect(() => {
       loadActivities();
    }, [loadActivities]);

    if (loadingInitial) return <LoadingComponent content='Loading activities'/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                    target={target}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityDashboard);
