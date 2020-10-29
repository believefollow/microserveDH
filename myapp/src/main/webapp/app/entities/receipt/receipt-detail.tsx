import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './receipt.reducer';
import { IReceipt } from 'app/shared/model/receipt.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReceiptDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReceiptDetail = (props: IReceiptDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { receiptEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myappApp.receipt.detail.title">Receipt</Translate> [<b>{receiptEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="number">
              <Translate contentKey="myappApp.receipt.number">Number</Translate>
            </span>
          </dt>
          <dd>{receiptEntity.number}</dd>
          <dt>
            <span id="receipted">
              <Translate contentKey="myappApp.receipt.receipted">Receipted</Translate>
            </span>
          </dt>
          <dd>{receiptEntity.receipted ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/receipt" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/receipt/${receiptEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ receipt }: IRootState) => ({
  receiptEntity: receipt.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptDetail);
