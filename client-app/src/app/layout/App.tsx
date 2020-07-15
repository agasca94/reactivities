import React, { useContext } from 'react';
import { Container } from 'semantic-ui-react';
import { NavBar } from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import ActivityDetailsContainer from '../../features/activities/details/ActivityDetailsContainer';
import ActivityFormContainer from '../../features/activities/form/ActivityFormContainer';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import { LoginForm } from '../../features/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import { LoadingComponent } from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

const App = () => {
    const rootStore = useContext(RootStoreContext);
    const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
    const { logout, isLoggedIn, user, getUser } = rootStore.userStore;

    React.useEffect(() => {
        if (token)
            getUser().finally(setAppLoaded);
        else
            setAppLoaded();
    }, [getUser, setAppLoaded, token]);

    if (!appLoaded) return <LoadingComponent content='Loading app...' />;

    return (
        <>
            <ModalContainer />
            <ToastContainer position='bottom-right'/>
            <Route exact path='/' component={HomePage}/>
            <Route path={'/(.+)'} render={() => (
                <>
                <NavBar logout={logout} isLoggedIn={isLoggedIn} user={user}/>
                <Container style={{marginTop: '7em'}}>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/activities' component={ActivityDashboard} />
                        <Route path='/activities/:id' component={ActivityDetailsContainer} />
                        <Route path={['/createActivity', '/edit/:id']} component={ActivityFormContainer} /> 
                        <Route path='/login' component={LoginForm}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Container>
                </>
            )}>
            </Route>
        </>
    );
};

export default observer(App);
