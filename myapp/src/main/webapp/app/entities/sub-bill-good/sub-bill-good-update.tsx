import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStorage } from 'app/shared/model/storage.model';
import { getEntities as getStorages } from 'app/entities/storage/storage.reducer';
import { getEntity, updateEntity, createEntity, reset } from './sub-bill-good.reducer';
import { ISubBillGood } from 'app/shared/model/sub-bill-good.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISubBillGoodUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubBillGoodUpdate = (props: ISubBillGoodUpdateProps) => {
  const [goodId, setGoodId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { subBillGoodEntity, storages, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/sub-bill-good');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getStorages();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...subBillGoodEntity,
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
          <h2 id="myappApp.subBillGood.home.createOrEditLabel">
            <Translate contentKey="myappApp.subBillGood.home.createOrEditLabel">Create or edit a SubBillGood</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : subBillGoodEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="sub-bill-good-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="sub-bill-good-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numberLabel" for="sub-bill-good-number">
                  <Translate contentKey="myappApp.subBillGood.number">Number</Translate>
                </Label>
                <AvField id="sub-bill-good-number" type="string" className="form-control" name="number" />
              </AvGroup>
              <AvGroup>
                <Label id="totalLabel" for="sub-bill-good-total">
                  <Translate contentKey="myappApp.subBillGood.total">Total</Translate>
                </Label>
                <AvField id="sub-bill-good-total" type="text" name="total" />
              </AvGroup>
              <AvGroup>
                <Label for="sub-bill-good-good">
                  <Translate contentKey="myappApp.subBillGood.good">Good</Translate>
                </Label>
                <AvInput id="sub-bill-good-good" type="select" className="form-control" name="good.id">
                  <option value="" key="0" />
                  {storages
                    ? storages.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/sub-bill-good" replace color="info">
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
  storages: storeState.storage.entities,
  subBillGoodEntity: storeState.subBillGood.entity,
  loading: storeState.subBillGood.loading,
  updating: storeState.subBillGood.updating,
  updateSuccess: storeState.subBillGood.updateSuccess,
});

const mapDispatchToProps = {
  getStorages,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubBillGoodUpdate);
