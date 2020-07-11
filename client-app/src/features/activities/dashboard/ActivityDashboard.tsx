import React from 'react'
import { Grid } from 'semantic-ui-react'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'
import { useContext } from 'react';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'

const ActivityDashboard = () => {
    const activityStore = useContext(ActivityStore);
    const { 
        activitiesByDate: activities,
        selectedActivity, 
        selectActivity, 
        createActivity,
        editActivity,
        deleteActivity,
        editMode,
        openEditForm,
        submitting,
        target,
        closeEditForm
    } = activityStore;

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
                {selectedActivity && !editMode &&
                    <ActivityDetails 
                        openEditForm={openEditForm} 
                        close={() => selectActivity(null)} 
                        activity={selectedActivity}
                    />
                }
                
                {editMode &&
                    <ActivityForm 
                        key={selectedActivity?.id || 0}
                        activity={selectedActivity}
                        closeEditForm={closeEditForm}
                        createActivity={createActivity}
                        editActivity={editActivity}
                        submitting={submitting}
                    />
                }
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityDashboard);
