import React, { useContext } from 'react'
import ActivityStore from '../../../app/stores/activityStore'
import { ActivityForm } from './ActivityForm';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory } from 'react-router-dom';
import { IActivity } from '../../../app/models/IActivity';

const ActivityFormContainer = () => {
    const activityStore = useContext(ActivityStore);
    const {
        activity, 
        selectActivity,
        createActivity, 
        editActivity, 
        loadActivity,
        submitting
    } = activityStore;
    const { id } = useParams();
    const history = useHistory();

    React.useEffect(() => {
        if (id) {
            loadActivity(id);
        }

        return () => {
            selectActivity(null);
        }
    }, [id, loadActivity, selectActivity]);

    const handleSaveActivity = (activity: IActivity, edit=true) => {
        const saveActivity = edit ? editActivity : createActivity;

        saveActivity(activity)
            .then(() => {
                history.push(`/activities/${activity.id}`);
            });
    }   

    return (
        <ActivityForm
            key={activity?.id || 0}
            activity={activity}
            closeEditForm={() => history.push('/activities')}
            createActivity={a => handleSaveActivity(a, false)}
            editActivity={a => handleSaveActivity(a, true)}
            submitting={submitting}
        />
    )
}

export default observer(ActivityFormContainer);
