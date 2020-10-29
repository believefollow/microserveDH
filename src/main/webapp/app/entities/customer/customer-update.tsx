import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICheckIn } from 'app/shared/model/check-in.model';
import { getEntities as getCheckIns } from 'app/entities/check-in/check-in.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerUpdate = (props: ICustomerUpdateProps) => {
  const [checkInId, setCheckInId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerEntity, checkIns, loading, updating } = props;

  const { img, imgContentType } = customerEntity;

  const handleClose = () => {
    props.history.push('/customer' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCheckIns();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...customerEntity,
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
          <h2 id="microserveDhApp.customer.home.createOrEditLabel">Create or edit a Customer</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-id">ID</Label>
                  <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="customer-name">
                  Name
                </Label>
                <AvField id="customer-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="idCardLabel" for="customer-idCard">
                  Id Card
                </Label>
                <AvField id="customer-idCard" type="text" name="idCard" />
              </AvGroup>
              <AvGroup>
                <Label id="sexLabel" for="customer-sex">
                  Sex
                </Label>
                <AvInput
                  id="customer-sex"
                  type="select"
                  className="form-control"
                  name="sex"
                  value={(!isNew && customerEntity.sex) || 'Male'}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="customer-address">
                  Address
                </Label>
                <AvField id="customer-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="nationLabel" for="customer-nation">
                  Nation
                </Label>
                <AvField id="customer-nation" type="text" name="nation" />
              </AvGroup>
              <AvGroup>
                <Label id="ageLabel" for="customer-age">
                  Age
                </Label>
                <AvField id="customer-age" type="string" className="form-control" name="age" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="imgLabel" for="img">
                    Img
                  </Label>
                  <br />
                  {img ? (
                    <div>
                      {imgContentType ? (
                        <a onClick={openFile(imgContentType, img)}>
                          <img src={`data:${imgContentType};base64,${img}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {imgContentType}, {byteSize(img)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('img')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_img" type="file" onChange={onBlobChange(true, 'img')} accept="image/*" />
                  <AvInput type="hidden" name="img" value={img} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label for="customer-checkIn">Check In</Label>
                <AvInput id="customer-checkIn" type="select" className="form-control" name="checkIn.id">
                  <option value="" key="0" />
                  {checkIns
                    ? checkIns.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  checkIns: storeState.checkIn.entities,
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess,
});

const mapDispatchToProps = {
  getCheckIns,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUpdate);
