import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './print-info.reducer';
import { IPrintInfo } from 'app/shared/model/print-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrintInfoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrintInfoDetail = (props: IPrintInfoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { printInfoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myappApp.printInfo.detail.title">PrintInfo</Translate> [<b>{printInfoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="baseInfo">
              <Translate contentKey="myappApp.printInfo.baseInfo">Base Info</Translate>
            </span>
          </dt>
          <dd>{printInfoEntity.baseInfo}</dd>
          <dt>
            <Translate contentKey="myappApp.printInfo.bill">Bill</Translate>
          </dt>
          <dd>{printInfoEntity.bill ? printInfoEntity.bill.id : ''}</dd>
          <dt>
            <Translate contentKey="myappApp.printInfo.payed">Payed</Translate>
          </dt>
          <dd>{printInfoEntity.payed ? printInfoEntity.payed.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/print-info" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/print-info/${printInfoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ printInfo }: IRootState) => ({
  printInfoEntity: printInfo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrintInfoDetail);
