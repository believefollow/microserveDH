import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bill.reducer';
import { IBill } from 'app/shared/model/bill.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBillDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BillDetail = (props: IBillDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { billEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myappApp.bill.detail.title">Bill</Translate> [<b>{billEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="balance">
              <Translate contentKey="myappApp.bill.balance">Balance</Translate>
            </span>
          </dt>
          <dd>{billEntity.balance}</dd>
          <dt>
            <span id="finished">
              <Translate contentKey="myappApp.bill.finished">Finished</Translate>
            </span>
          </dt>
          <dd>{billEntity.finished ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="myappApp.bill.receipt">Receipt</Translate>
          </dt>
          <dd>{billEntity.receipt ? billEntity.receipt.id : ''}</dd>
          <dt>
            <Translate contentKey="myappApp.bill.subBill">Sub Bill</Translate>
          </dt>
          <dd>{billEntity.subBill ? billEntity.subBill.id : ''}</dd>
          <dt>
            <Translate contentKey="myappApp.bill.payed">Payed</Translate>
          </dt>
          <dd>{billEntity.payed ? billEntity.payed.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/bill" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bill/${billEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bill }: IRootState) => ({
  billEntity: bill.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BillDetail);
