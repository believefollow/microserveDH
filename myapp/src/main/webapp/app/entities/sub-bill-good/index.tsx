import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SubBillGood from './sub-bill-good';
import SubBillGoodDetail from './sub-bill-good-detail';
import SubBillGoodUpdate from './sub-bill-good-update';
import SubBillGoodDeleteDialog from './sub-bill-good-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SubBillGoodUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SubBillGoodUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SubBillGoodDetail} />
      <ErrorBoundaryRoute path={match.url} component={SubBillGood} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SubBillGoodDeleteDialog} />
  </>
);

export default Routes;
