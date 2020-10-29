import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './payed.reducer';
import { IPayed } from 'app/shared/model/payed.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPayedDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PayedDetail = (props: IPayedDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { payedEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myappApp.payed.detail.title">Payed</Translate> [<b>{payedEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="source">
              <Translate contentKey="myappApp.payed.source">Source</Translate>
            </span>
          </dt>
          <dd>{payedEntity.source}</dd>
          <dt>
            <span id="payId">
              <Translate contentKey="myappApp.payed.payId">Pay Id</Translate>
            </span>
          </dt>
          <dd>{payedEntity.payId}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="myappApp.payed.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{payedEntity.amount}</dd>
        </dl>
        <Button tag={Link} to="/payed" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payed/${payedEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ payed }: IRootState) => ({
  payedEntity: payed.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PayedDetail);
