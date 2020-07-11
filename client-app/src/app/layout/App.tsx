import React from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/IActivity';
import { NavBar } from './NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {
    const [activities, setActivities] = React.useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = React.useState<IActivity | null>(null);
    const [editMode, setEditMode] = React.useState(false);

    const handleSelectActivity = (id: string | null) => {
        if (!id) setSelectedActivity(null);
        setSelectedActivity(activities.find(a => a.id === id) || null);
    }

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    }

    const handleCreateActivity = (activity: IActivity) => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    }

    const handleEditActivity = (activity: IActivity) => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    }

    const hanldeDeleteActivity = (id: string) => {
        setActivities([...activities.filter(a => a.id !== id)]);
    }

    React.useEffect(() => {
        axios
            .get<IActivity[]>('http://localhost:5000/api/activities')
            .then(response => {
                const activities = response.data.map(a => ({
                    ...a,
                    date: a.date.split('.')[0]
                }));
                setActivities(activities);
            });
    }, []);

    return (
        <>
            <NavBar openCreateForm={handleOpenCreateForm}/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard 
                    selectActivity={handleSelectActivity}
                    selectedActivity={selectedActivity}
                    activities={activities}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    createActivity={handleCreateActivity}
                    editActivity={handleEditActivity}
                    deleteActivity={hanldeDeleteActivity}
                />
            </Container>
        </>
    );
}

export default App;
