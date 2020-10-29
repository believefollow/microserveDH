import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Receipt from './receipt';
import ReceiptDetail from './receipt-detail';
import ReceiptUpdate from './receipt-update';
import ReceiptDeleteDialog from './receipt-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReceiptUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReceiptUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReceiptDetail} />
      <ErrorBoundaryRoute path={match.url} component={Receipt} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ReceiptDeleteDialog} />
  </>
);

export default Routes;
