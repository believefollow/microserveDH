import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './room-type.reducer';
import { IRoomType } from 'app/shared/model/room-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRoomTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const RoomType = (props: IRoomTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { roomTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="room-type-heading">
        <Translate contentKey="myappApp.roomType.home.title">Room Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myappApp.roomType.home.createLabel">Create new Room Type</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {roomTypeList && roomTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.roomType.number">Number</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.roomType.feature">Feature</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.roomType.price">Price</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {roomTypeList.map((roomType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${roomType.id}`} color="link" size="sm">
                      {roomType.id}
                    </Button>
                  </td>
                  <td>{roomType.number}</td>
                  <td>{roomType.feature}</td>
                  <td>{roomType.price}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${roomType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${roomType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${roomType.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="myappApp.roomType.home.notFound">No Room Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ roomType }: IRootState) => ({
  roomTypeList: roomType.entities,
  loading: roomType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RoomType);
