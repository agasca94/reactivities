import React from 'react';
import { Container } from 'semantic-ui-react';
import { NavBar } from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import ActivityDetailsContainer from '../../features/activities/details/ActivityDetailsContainer';
import ActivityFormContainer from '../../features/activities/form/ActivityFormContainer';

const App = () => {
    return (
        <>
            <Route exact path='/' component={HomePage}/>
            <Route path={'/(.+)'} render={() => (
                <>
                    <NavBar/>
                    <Container style={{marginTop: '7em'}}>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/activities' component={ActivityDashboard} />
                        <Route path='/activities/:id' component={ActivityDetailsContainer} />
                        <Route path={['/createActivity', '/edit/:id']} component={ActivityFormContainer} /> 
                    </Container>
                </>
            )}>
            </Route>
        </>
    );
};

export default observer(App);
