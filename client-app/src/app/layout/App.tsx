import React, { useContext } from 'react';
import { Container } from 'semantic-ui-react';
import { NavBar } from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';

const App = () => {
    const activityStore = useContext(ActivityStore);
    const { openCreateForm, loadActivities } = activityStore;

    React.useEffect(() => {
       loadActivities();
    }, [loadActivities]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities'/>;

    return (
        <>
            <NavBar openCreateForm={openCreateForm}/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard/>
            </Container>
        </>
    );
};

export default observer(App);
