import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sub-bill-good.reducer';
import { ISubBillGood } from 'app/shared/model/sub-bill-good.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubBillGoodDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubBillGoodDetail = (props: ISubBillGoodDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { subBillGoodEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myappApp.subBillGood.detail.title">SubBillGood</Translate> [<b>{subBillGoodEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="number">
              <Translate contentKey="myappApp.subBillGood.number">Number</Translate>
            </span>
          </dt>
          <dd>{subBillGoodEntity.number}</dd>
          <dt>
            <span id="total">
              <Translate contentKey="myappApp.subBillGood.total">Total</Translate>
            </span>
          </dt>
          <dd>{subBillGoodEntity.total}</dd>
          <dt>
            <Translate contentKey="myappApp.subBillGood.good">Good</Translate>
          </dt>
          <dd>{subBillGoodEntity.good ? subBillGoodEntity.good.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/sub-bill-good" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sub-bill-good/${subBillGoodEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ subBillGood }: IRootState) => ({
  subBillGoodEntity: subBillGood.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubBillGoodDetail);
