import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Import components
import Homepage from '../components/homepage';

const Routes = () => (
    <Switch>
        <Route exact path = "/" component={Homepage} />
        <Route exact path = "/crear" render={() => <h1>Crea tu película bro</h1>} />
        {/* Redirect to / if the route requested does not exist */}
        <Redirect to='/' />
    </Switch>
);

export default Routes;