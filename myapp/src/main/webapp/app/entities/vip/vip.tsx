import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vip.reducer';
import { IVip } from 'app/shared/model/vip.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVipProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Vip = (props: IVipProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { vipList, match, loading } = props;
  return (
    <div>
      <h2 id="vip-heading">
        <Translate contentKey="myappApp.vip.home.title">Vips</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myappApp.vip.home.createLabel">Create new Vip</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {vipList && vipList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.vip.phone">Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.vip.actived">Actived</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.vip.signInTime">Sign In Time</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.vip.customer">Customer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vipList.map((vip, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${vip.id}`} color="link" size="sm">
                      {vip.id}
                    </Button>
                  </td>
                  <td>{vip.phone}</td>
                  <td>{vip.actived ? 'true' : 'false'}</td>
                  <td>{vip.signInTime ? <TextFormat type="date" value={vip.signInTime} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{vip.customer ? <Link to={`customer/${vip.customer.id}`}>{vip.customer.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vip.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vip.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vip.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="myappApp.vip.home.notFound">No Vips found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vip }: IRootState) => ({
  vipList: vip.entities,
  loading: vip.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Vip);
