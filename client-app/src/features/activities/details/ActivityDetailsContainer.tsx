import React, { useContext } from 'react'
import { ActivityDetails } from './ActivityDetails';
import { useParams, useHistory } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ActivityDetailsContainer = () => {
    const rootStore = useContext(RootStoreContext);
    const { 
        activity, 
        loadActivity,
        loadingInitial
    } = rootStore.activityStore;
    
    const { id } = useParams();
    const history = useHistory();

    React.useEffect(() => {
        loadActivity(id);
    }, [loadActivity, id]);

    if (loadingInitial) return <LoadingComponent content='Loading activity...'/>;
    if (!activity) return <h2>Activity not found!</h2>
    return (
        <ActivityDetails
            activity={activity}
            close={() => history.push('/activities')}
        />
    );
}

export default observer(ActivityDetailsContainer);
