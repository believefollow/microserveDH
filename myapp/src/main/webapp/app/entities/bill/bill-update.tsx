import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IReceipt } from 'app/shared/model/receipt.model';
import { getEntities as getReceipts } from 'app/entities/receipt/receipt.reducer';
import { ISubBill } from 'app/shared/model/sub-bill.model';
import { getEntities as getSubBills } from 'app/entities/sub-bill/sub-bill.reducer';
import { IPayed } from 'app/shared/model/payed.model';
import { getEntities as getPayeds } from 'app/entities/payed/payed.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bill.reducer';
import { IBill } from 'app/shared/model/bill.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBillUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BillUpdate = (props: IBillUpdateProps) => {
  const [receiptId, setReceiptId] = useState('0');
  const [subBillId, setSubBillId] = useState('0');
  const [payedId, setPayedId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { billEntity, receipts, subBills, payeds, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/bill');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getReceipts();
    props.getSubBills();
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
        ...billEntity,
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
          <h2 id="myappApp.bill.home.createOrEditLabel">
            <Translate contentKey="myappApp.bill.home.createOrEditLabel">Create or edit a Bill</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : billEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="bill-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="bill-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="balanceLabel" for="bill-balance">
                  <Translate contentKey="myappApp.bill.balance">Balance</Translate>
                </Label>
                <AvField id="bill-balance" type="text" name="balance" />
              </AvGroup>
              <AvGroup check>
                <Label id="finishedLabel">
                  <AvInput id="bill-finished" type="checkbox" className="form-check-input" name="finished" />
                  <Translate contentKey="myappApp.bill.finished">Finished</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="bill-receipt">
                  <Translate contentKey="myappApp.bill.receipt">Receipt</Translate>
                </Label>
                <AvInput id="bill-receipt" type="select" className="form-control" name="receipt.id">
                  <option value="" key="0" />
                  {receipts
                    ? receipts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="bill-subBill">
                  <Translate contentKey="myappApp.bill.subBill">Sub Bill</Translate>
                </Label>
                <AvInput id="bill-subBill" type="select" className="form-control" name="subBill.id">
                  <option value="" key="0" />
                  {subBills
                    ? subBills.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="bill-payed">
                  <Translate contentKey="myappApp.bill.payed">Payed</Translate>
                </Label>
                <AvInput id="bill-payed" type="select" className="form-control" name="payed.id">
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
              <Button tag={Link} id="cancel-save" to="/bill" replace color="info">
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
  receipts: storeState.receipt.entities,
  subBills: storeState.subBill.entities,
  payeds: storeState.payed.entities,
  billEntity: storeState.bill.entity,
  loading: storeState.bill.loading,
  updating: storeState.bill.updating,
  updateSuccess: storeState.bill.updateSuccess,
});

const mapDispatchToProps = {
  getReceipts,
  getSubBills,
  getPayeds,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BillUpdate);
