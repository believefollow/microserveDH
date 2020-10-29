import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Payed from './payed';
import PayedDetail from './payed-detail';
import PayedUpdate from './payed-update';
import PayedDeleteDialog from './payed-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PayedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PayedUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PayedDetail} />
      <ErrorBoundaryRoute path={match.url} component={Payed} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PayedDeleteDialog} />
  </>
);

export default Routes;
