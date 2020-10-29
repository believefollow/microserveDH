import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './room-type.reducer';
import { IRoomType } from 'app/shared/model/room-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRoomTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RoomTypeDetail = (props: IRoomTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { roomTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myappApp.roomType.detail.title">RoomType</Translate> [<b>{roomTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="number">
              <Translate contentKey="myappApp.roomType.number">Number</Translate>
            </span>
          </dt>
          <dd>{roomTypeEntity.number}</dd>
          <dt>
            <span id="feature">
              <Translate contentKey="myappApp.roomType.feature">Feature</Translate>
            </span>
          </dt>
          <dd>{roomTypeEntity.feature}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="myappApp.roomType.price">Price</Translate>
            </span>
          </dt>
          <dd>{roomTypeEntity.price}</dd>
        </dl>
        <Button tag={Link} to="/room-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/room-type/${roomTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ roomType }: IRootState) => ({
  roomTypeEntity: roomType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RoomTypeDetail);
