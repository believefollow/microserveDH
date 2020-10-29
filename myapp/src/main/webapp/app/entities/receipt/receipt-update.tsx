import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './receipt.reducer';
import { IReceipt } from 'app/shared/model/receipt.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReceiptUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReceiptUpdate = (props: IReceiptUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { receiptEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/receipt');
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
        ...receiptEntity,
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
          <h2 id="myappApp.receipt.home.createOrEditLabel">
            <Translate contentKey="myappApp.receipt.home.createOrEditLabel">Create or edit a Receipt</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : receiptEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="receipt-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="receipt-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numberLabel" for="receipt-number">
                  <Translate contentKey="myappApp.receipt.number">Number</Translate>
                </Label>
                <AvField id="receipt-number" type="text" name="number" />
              </AvGroup>
              <AvGroup check>
                <Label id="receiptedLabel">
                  <AvInput id="receipt-receipted" type="checkbox" className="form-check-input" name="receipted" />
                  <Translate contentKey="myappApp.receipt.receipted">Receipted</Translate>
                </Label>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/receipt" replace color="info">
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
  receiptEntity: storeState.receipt.entity,
  loading: storeState.receipt.loading,
  updating: storeState.receipt.updating,
  updateSuccess: storeState.receipt.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptUpdate);
