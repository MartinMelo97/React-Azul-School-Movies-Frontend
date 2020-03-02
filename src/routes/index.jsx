import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Routes = () => (
    <Switch>
        <Route exact path = "/" render={() => <h1>Hola a todos!</h1>} />
        <Route exact path = "/crear" render={() => <h1>Crea tu película bro</h1>} />
        {/* Redirect to / if the route requested does not exist */}
        <Redirect to='/' />
    </Switch>
);

export default Routes;