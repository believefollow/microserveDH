import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './room-type.reducer';
import { IRoomType } from 'app/shared/model/room-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRoomTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RoomTypeUpdate = (props: IRoomTypeUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { roomTypeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/room-type');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...roomTypeEntity,
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
          <h2 id="myappApp.roomType.home.createOrEditLabel">
            <Translate contentKey="myappApp.roomType.home.createOrEditLabel">Create or edit a RoomType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : roomTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="room-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="room-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numberLabel" for="room-type-number">
                  <Translate contentKey="myappApp.roomType.number">Number</Translate>
                </Label>
                <AvField id="room-type-number" type="string" className="form-control" name="number" />
              </AvGroup>
              <AvGroup>
                <Label id="featureLabel" for="room-type-feature">
                  <Translate contentKey="myappApp.roomType.feature">Feature</Translate>
                </Label>
                <AvField id="room-type-feature" type="text" name="feature" />
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="room-type-price">
                  <Translate contentKey="myappApp.roomType.price">Price</Translate>
                </Label>
                <AvField id="room-type-price" type="text" name="price" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/room-type" replace color="info">
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
  roomTypeEntity: storeState.roomType.entity,
  loading: storeState.roomType.loading,
  updating: storeState.roomType.updating,
  updateSuccess: storeState.roomType.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RoomTypeUpdate);
