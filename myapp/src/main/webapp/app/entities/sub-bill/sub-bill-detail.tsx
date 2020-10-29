import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sub-bill.reducer';
import { ISubBill } from 'app/shared/model/sub-bill.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubBillDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubBillDetail = (props: ISubBillDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { subBillEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myappApp.subBill.detail.title">SubBill</Translate> [<b>{subBillEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="number">
              <Translate contentKey="myappApp.subBill.number">Number</Translate>
            </span>
          </dt>
          <dd>{subBillEntity.number}</dd>
          <dt>
            <span id="total">
              <Translate contentKey="myappApp.subBill.total">Total</Translate>
            </span>
          </dt>
          <dd>{subBillEntity.total}</dd>
          <dt>
            <Translate contentKey="myappApp.subBill.good">Good</Translate>
          </dt>
          <dd>{subBillEntity.good ? subBillEntity.good.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/sub-bill" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sub-bill/${subBillEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ subBill }: IRootState) => ({
  subBillEntity: subBill.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubBillDetail);
