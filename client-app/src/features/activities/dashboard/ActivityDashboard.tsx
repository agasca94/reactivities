import React from 'react'
import { Grid } from 'semantic-ui-react'
import { ActivityList } from './ActivityList'
import { useContext } from 'react';
import { observer } from 'mobx-react-lite'
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ActivityDashboard = () => {
    const rootStore = useContext(RootStoreContext);
    const { 
        activitiesByDate,
        selectActivity, 
        loadActivities,
        loadingInitial,
    } = rootStore.activityStore;

    React.useEffect(() => {
       loadActivities();
    }, [loadActivities]);

    if (loadingInitial) return <LoadingComponent content='Loading activities'/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                    activitiesByDate={activitiesByDate} 
                    selectActivity={selectActivity}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityDashboard);
