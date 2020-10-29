import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Customer from './customer';
import Vip from './vip';
import Room from './room';
import RoomType from './room-type';
import Bill from './bill';
import Receipt from './receipt';
import Payed from './payed';
import Storage from './storage';
import SubBill from './sub-bill';
import SubBillGood from './sub-bill-good';
import Card from './card';
import PrintInfo from './print-info';
import Booking from './booking';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}vip`} component={Vip} />
      <ErrorBoundaryRoute path={`${match.url}room`} component={Room} />
      <ErrorBoundaryRoute path={`${match.url}room-type`} component={RoomType} />
      <ErrorBoundaryRoute path={`${match.url}bill`} component={Bill} />
      <ErrorBoundaryRoute path={`${match.url}receipt`} component={Receipt} />
      <ErrorBoundaryRoute path={`${match.url}payed`} component={Payed} />
      <ErrorBoundaryRoute path={`${match.url}storage`} component={Storage} />
      <ErrorBoundaryRoute path={`${match.url}sub-bill`} component={SubBill} />
      <ErrorBoundaryRoute path={`${match.url}sub-bill-good`} component={SubBillGood} />
      <ErrorBoundaryRoute path={`${match.url}card`} component={Card} />
      <ErrorBoundaryRoute path={`${match.url}print-info`} component={PrintInfo} />
      <ErrorBoundaryRoute path={`${match.url}booking`} component={Booking} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
