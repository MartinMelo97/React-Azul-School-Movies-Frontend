import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Import components
import Homepage from '../components/homepage';
import {
    MovieList,
    MovieDetail,
    MovieForm
} from '../components/movies';

const Routes = () => (
    <Switch>
        <Route exact path = "/" component={Homepage} />
        <Route exact path = "/peliculas" component={MovieList} />
        <Route exact path = "/peliculas/crear" component={MovieForm} />
        <Route exact path = "/peliculas/editar/:movieId" component={MovieForm} />
        <Route exact path = "/peliculas/:movieId" component={MovieDetail} />
        {/* Redirect to / if the route requested does not exist */}
        <Redirect to='/' />
    </Switch>
);

export default Routes;