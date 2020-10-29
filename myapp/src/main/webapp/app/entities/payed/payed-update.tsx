import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './payed.reducer';
import { IPayed } from 'app/shared/model/payed.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPayedUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PayedUpdate = (props: IPayedUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { payedEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/payed');
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
        ...payedEntity,
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
          <h2 id="myappApp.payed.home.createOrEditLabel">
            <Translate contentKey="myappApp.payed.home.createOrEditLabel">Create or edit a Payed</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : payedEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="payed-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="payed-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sourceLabel" for="payed-source">
                  <Translate contentKey="myappApp.payed.source">Source</Translate>
                </Label>
                <AvInput
                  id="payed-source"
                  type="select"
                  className="form-control"
                  name="source"
                  value={(!isNew && payedEntity.source) || 'AliPay'}
                >
                  <option value="AliPay">{translate('myappApp.Source.AliPay')}</option>
                  <option value="WeChat">{translate('myappApp.Source.WeChat')}</option>
                  <option value="Cash">{translate('myappApp.Source.Cash')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="payIdLabel" for="payed-payId">
                  <Translate contentKey="myappApp.payed.payId">Pay Id</Translate>
                </Label>
                <AvField id="payed-payId" type="text" name="payId" />
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="payed-amount">
                  <Translate contentKey="myappApp.payed.amount">Amount</Translate>
                </Label>
                <AvField id="payed-amount" type="text" name="amount" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/payed" replace color="info">
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
  payedEntity: storeState.payed.entity,
  loading: storeState.payed.loading,
  updating: storeState.payed.updating,
  updateSuccess: storeState.payed.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PayedUpdate);
