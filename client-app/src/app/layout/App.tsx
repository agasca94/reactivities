import React from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/IActivity';
import { NavBar } from './NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../../api/agent';
import { LoadingComponent } from './LoadingComponent';

const App = () => {
    const [activities, setActivities] = React.useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = React.useState<IActivity | null>(null);
    const [editMode, setEditMode] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [submitting, setSubmitting] = React.useState(false);
    const [target, setTarget] = React.useState('');

    const handleSelectActivity = (id: string | null) => {
        if (!id) setSelectedActivity(null);
        setSelectedActivity(activities.find(a => a.id === id) || null);
    }

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    }

    const handleCreateActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.create(activity).then(() => {
            setActivities([...activities, activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }).then(() => setSubmitting(false));
    }

    const handleEditActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.update(activity).then(() => {
            setActivities([...activities.filter(a => a.id !== activity.id), activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }).then(() => setSubmitting(false));
    }

    const hanldeDeleteActivity = (id: string) => {
        setTarget(id);
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(a => a.id !== id)]);
        }).then(() => setSubmitting(false));
    }

    React.useEffect(() => {
        agent.Activities.list()
            .then(response => {
                const activities = response.map(a => ({
                    ...a,
                    date: a.date.split('.')[0]
                }));
                setActivities(activities);
            })
            .then(() => setLoading(false));
    }, []);

    if (loading) return <LoadingComponent content='Loading activities'/>;

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
                    submitting={submitting}
                    target={target}
                />
            </Container>
        </>
    );
}

export default App;
