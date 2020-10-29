import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vip.reducer';
import { IVip } from 'app/shared/model/vip.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVipDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VipDetail = (props: IVipDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vipEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myappApp.vip.detail.title">Vip</Translate> [<b>{vipEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="phone">
              <Translate contentKey="myappApp.vip.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{vipEntity.phone}</dd>
          <dt>
            <span id="actived">
              <Translate contentKey="myappApp.vip.actived">Actived</Translate>
            </span>
          </dt>
          <dd>{vipEntity.actived ? 'true' : 'false'}</dd>
          <dt>
            <span id="signInTime">
              <Translate contentKey="myappApp.vip.signInTime">Sign In Time</Translate>
            </span>
          </dt>
          <dd>{vipEntity.signInTime ? <TextFormat value={vipEntity.signInTime} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="myappApp.vip.customer">Customer</Translate>
          </dt>
          <dd>{vipEntity.customer ? vipEntity.customer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vip" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vip/${vipEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vip }: IRootState) => ({
  vipEntity: vip.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VipDetail);
