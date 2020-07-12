import React, { useContext } from 'react'
import { ActivityDetails } from './ActivityDetails';
import ActivityStore from '../../../app/stores/activityStore'
import { useParams, useHistory } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';

const ActivityDetailsContainer = () => {
    const activityStore = useContext(ActivityStore);
    const { 
        activity, 
        loadActivity,
        loadingInitial
    } = activityStore;
    
    const { id } = useParams();
    const history = useHistory();

    React.useEffect(() => {
        loadActivity(id);
    }, [loadActivity, id]);

    if (loadingInitial || !activity) return <LoadingComponent content='Loading activity...'/>;

    return (
        <ActivityDetails
            activity={activity}
            close={() => history.push('/activities')}
        />
    );
}

export default observer(ActivityDetailsContainer);
