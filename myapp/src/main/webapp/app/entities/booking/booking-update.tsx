import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { IPayed } from 'app/shared/model/payed.model';
import { getEntities as getPayeds } from 'app/entities/payed/payed.reducer';
import { getEntity, updateEntity, createEntity, reset } from './booking.reducer';
import { IBooking } from 'app/shared/model/booking.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBookingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookingUpdate = (props: IBookingUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [payedId, setPayedId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bookingEntity, customers, payeds, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/booking');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
    props.getPayeds();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...bookingEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="myappApp.booking.home.createOrEditLabel">
            <Translate contentKey="myappApp.booking.home.createOrEditLabel">Create or edit a Booking</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bookingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="booking-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="booking-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="arrivedTimeLabel" for="booking-arrivedTime">
                  <Translate contentKey="myappApp.booking.arrivedTime">Arrived Time</Translate>
                </Label>
                <AvField id="booking-arrivedTime" type="date" className="form-control" name="arrivedTime" />
              </AvGroup>
              <AvGroup>
                <Label id="leavingtimeLabel" for="booking-leavingtime">
                  <Translate contentKey="myappApp.booking.leavingtime">Leavingtime</Translate>
                </Label>
                <AvField id="booking-leavingtime" type="date" className="form-control" name="leavingtime" />
              </AvGroup>
              <AvGroup>
                <Label id="bookingTimeLabel" for="booking-bookingTime">
                  <Translate contentKey="myappApp.booking.bookingTime">Booking Time</Translate>
                </Label>
                <AvField id="booking-bookingTime" type="date" className="form-control" name="bookingTime" />
              </AvGroup>
              <AvGroup>
                <Label for="booking-customer">
                  <Translate contentKey="myappApp.booking.customer">Customer</Translate>
                </Label>
                <AvInput id="booking-customer" type="select" className="form-control" name="customer.id">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="booking-payed">
                  <Translate contentKey="myappApp.booking.payed">Payed</Translate>
                </Label>
                <AvInput id="booking-payed" type="select" className="form-control" name="payed.id">
                  <option value="" key="0" />
                  {payeds
                    ? payeds.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/booking" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  customers: storeState.customer.entities,
  payeds: storeState.payed.entities,
  bookingEntity: storeState.booking.entity,
  loading: storeState.booking.loading,
  updating: storeState.booking.updating,
  updateSuccess: storeState.booking.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getPayeds,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookingUpdate);
