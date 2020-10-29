import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PrintInfo from './print-info';
import PrintInfoDetail from './print-info-detail';
import PrintInfoUpdate from './print-info-update';
import PrintInfoDeleteDialog from './print-info-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrintInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrintInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrintInfoDetail} />
      <ErrorBoundaryRoute path={match.url} component={PrintInfo} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrintInfoDeleteDialog} />
  </>
);

export default Routes;
