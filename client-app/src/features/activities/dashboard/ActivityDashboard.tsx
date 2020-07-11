import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/IActivity'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string | null) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({ 
    activities, 
    selectedActivity, 
    selectActivity, 
    editMode, 
    setEditMode,
    createActivity,
    editActivity,
    deleteActivity
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&
                    <ActivityDetails 
                        setEditMode={setEditMode} 
                        selectActivity={selectActivity} 
                        activity={selectedActivity} 
                    />
                }
                
                {editMode &&
                    <ActivityForm 
                        key={selectedActivity?.id || 0}
                        activity={selectedActivity} 
                        setEditMode={setEditMode}
                        createActivity={createActivity}
                        editActivity={editActivity}
                    />
                }
            </Grid.Column>
        </Grid>
    )
}
