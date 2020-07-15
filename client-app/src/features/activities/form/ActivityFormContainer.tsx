import React, { useContext } from 'react'
import { ActivityForm } from './ActivityForm';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory } from 'react-router-dom';
import { IActivity } from '../../../app/models/IActivity';
import { toast } from 'react-toastify';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ActivityFormContainer = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        activity, 
        selectActivity,
        createActivity, 
        editActivity, 
        loadActivity,
        loadingInitial,
        submitting
    } = rootStore.activityStore;
    const { id } = useParams();
    const history = useHistory();

    React.useEffect(() => {
        if (id) {
            loadActivity(id);
        } else {
            selectActivity(null);
        }
        return () => {
            selectActivity(null);
        }
    }, [id, loadActivity, selectActivity]);

    const handleSaveActivity = (activity: IActivity, edit=true) => {
        const saveActivity = edit ? editActivity : createActivity;

        saveActivity(activity)
            .then(err => {
                console.log(err)
                if (!err)
                    history.push(`/activities/${activity.id}`);
                else
                    toast.error('Problem submitting data');
            });
    }   

    return (
        <ActivityForm
            key={activity?.id || 0}
            activity={activity}
            closeEditForm={
                activity?.id 
                    ? () => history.push(`/activities/${activity.id}`) 
                    : () => history.push('/activities')
            }
            createActivity={a => handleSaveActivity(a, false)}
            editActivity={a => handleSaveActivity(a, true)}
            submitting={submitting}
            loading={loadingInitial}
        />
    )
}

export default observer(ActivityFormContainer);
