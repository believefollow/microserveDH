import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './card.reducer';
import { ICard } from 'app/shared/model/card.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICardDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CardDetail = (props: ICardDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { cardEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="myappApp.card.detail.title">Card</Translate> [<b>{cardEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="key">
              <Translate contentKey="myappApp.card.key">Key</Translate>
            </span>
          </dt>
          <dd>{cardEntity.key}</dd>
          <dt>
            <span id="roomNumber">
              <Translate contentKey="myappApp.card.roomNumber">Room Number</Translate>
            </span>
          </dt>
          <dd>{cardEntity.roomNumber}</dd>
        </dl>
        <Button tag={Link} to="/card" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/card/${cardEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ card }: IRootState) => ({
  cardEntity: card.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail);
