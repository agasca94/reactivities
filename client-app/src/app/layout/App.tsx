import React from 'react';
import { Container } from 'semantic-ui-react';
import { NavBar } from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import ActivityDetailsContainer from '../../features/activities/details/ActivityDetailsContainer';
import ActivityFormContainer from '../../features/activities/form/ActivityFormContainer';
import NotFound from './NotFound';

import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
    return (
        <>
            <ToastContainer position='bottom-right'/>
            <Route exact path='/' component={HomePage}/>
            <Route path={'/(.+)'} render={() => (
                <>
                    <NavBar/>
                    <Container style={{marginTop: '7em'}}>
                        <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route exact path='/activities' component={ActivityDashboard} />
                            <Route path='/activities/:id' component={ActivityDetailsContainer} />
                            <Route path={['/createActivity', '/edit/:id']} component={ActivityFormContainer} /> 
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
