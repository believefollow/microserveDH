import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SubBill from './sub-bill';
import SubBillDetail from './sub-bill-detail';
import SubBillUpdate from './sub-bill-update';
import SubBillDeleteDialog from './sub-bill-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SubBillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SubBillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SubBillDetail} />
      <ErrorBoundaryRoute path={match.url} component={SubBill} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SubBillDeleteDialog} />
  </>
);

export default Routes;
