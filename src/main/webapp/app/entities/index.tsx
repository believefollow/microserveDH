import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Customer from './customer';
import Vip from './vip';
import Bill from './bill';
import CheckIn from './check-in';
import Room from './room';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}vip`} component={Vip} />
      <ErrorBoundaryRoute path={`${match.url}bill`} component={Bill} />
      <ErrorBoundaryRoute path={`${match.url}check-in`} component={CheckIn} />
      <ErrorBoundaryRoute path={`${match.url}room`} component={Room} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
