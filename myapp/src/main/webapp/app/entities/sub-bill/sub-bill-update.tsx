import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRoomType } from 'app/shared/model/room-type.model';
import { getEntities as getRoomTypes } from 'app/entities/room-type/room-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './sub-bill.reducer';
import { ISubBill } from 'app/shared/model/sub-bill.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISubBillUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubBillUpdate = (props: ISubBillUpdateProps) => {
  const [goodId, setGoodId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { subBillEntity, roomTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/sub-bill');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getRoomTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...subBillEntity,
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
          <h2 id="myappApp.subBill.home.createOrEditLabel">
            <Translate contentKey="myappApp.subBill.home.createOrEditLabel">Create or edit a SubBill</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : subBillEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="sub-bill-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="sub-bill-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numberLabel" for="sub-bill-number">
                  <Translate contentKey="myappApp.subBill.number">Number</Translate>
                </Label>
                <AvField id="sub-bill-number" type="string" className="form-control" name="number" />
              </AvGroup>
              <AvGroup>
                <Label id="totalLabel" for="sub-bill-total">
                  <Translate contentKey="myappApp.subBill.total">Total</Translate>
                </Label>
                <AvField id="sub-bill-total" type="text" name="total" />
              </AvGroup>
              <AvGroup>
                <Label for="sub-bill-good">
                  <Translate contentKey="myappApp.subBill.good">Good</Translate>
                </Label>
                <AvInput id="sub-bill-good" type="select" className="form-control" name="good.id">
                  <option value="" key="0" />
                  {roomTypes
                    ? roomTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/sub-bill" replace color="info">
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
  roomTypes: storeState.roomType.entities,
  subBillEntity: storeState.subBill.entity,
  loading: storeState.subBill.loading,
  updating: storeState.subBill.updating,
  updateSuccess: storeState.subBill.updateSuccess,
});

const mapDispatchToProps = {
  getRoomTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubBillUpdate);
