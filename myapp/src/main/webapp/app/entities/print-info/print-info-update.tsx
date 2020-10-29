import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBill } from 'app/shared/model/bill.model';
import { getEntities as getBills } from 'app/entities/bill/bill.reducer';
import { IPayed } from 'app/shared/model/payed.model';
import { getEntities as getPayeds } from 'app/entities/payed/payed.reducer';
import { getEntity, updateEntity, createEntity, reset } from './print-info.reducer';
import { IPrintInfo } from 'app/shared/model/print-info.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPrintInfoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrintInfoUpdate = (props: IPrintInfoUpdateProps) => {
  const [billId, setBillId] = useState('0');
  const [payedId, setPayedId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { printInfoEntity, bills, payeds, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/print-info');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBills();
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
        ...printInfoEntity,
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
          <h2 id="myappApp.printInfo.home.createOrEditLabel">
            <Translate contentKey="myappApp.printInfo.home.createOrEditLabel">Create or edit a PrintInfo</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : printInfoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="print-info-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="print-info-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="baseInfoLabel" for="print-info-baseInfo">
                  <Translate contentKey="myappApp.printInfo.baseInfo">Base Info</Translate>
                </Label>
                <AvField id="print-info-baseInfo" type="text" name="baseInfo" />
              </AvGroup>
              <AvGroup>
                <Label for="print-info-bill">
                  <Translate contentKey="myappApp.printInfo.bill">Bill</Translate>
                </Label>
                <AvInput id="print-info-bill" type="select" className="form-control" name="bill.id">
                  <option value="" key="0" />
                  {bills
                    ? bills.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="print-info-payed">
                  <Translate contentKey="myappApp.printInfo.payed">Payed</Translate>
                </Label>
                <AvInput id="print-info-payed" type="select" className="form-control" name="payed.id">
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
              <Button tag={Link} id="cancel-save" to="/print-info" replace color="info">
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
  bills: storeState.bill.entities,
  payeds: storeState.payed.entities,
  printInfoEntity: storeState.printInfo.entity,
  loading: storeState.printInfo.loading,
  updating: storeState.printInfo.updating,
  updateSuccess: storeState.printInfo.updateSuccess,
});

const mapDispatchToProps = {
  getBills,
  getPayeds,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrintInfoUpdate);
