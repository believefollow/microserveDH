import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './payed.reducer';
import { IPayed } from 'app/shared/model/payed.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPayedProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Payed = (props: IPayedProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { payedList, match, loading } = props;
  return (
    <div>
      <h2 id="payed-heading">
        <Translate contentKey="myappApp.payed.home.title">Payeds</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myappApp.payed.home.createLabel">Create new Payed</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {payedList && payedList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.payed.source">Source</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.payed.payId">Pay Id</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.payed.amount">Amount</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {payedList.map((payed, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${payed.id}`} color="link" size="sm">
                      {payed.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`myappApp.Source.${payed.source}`} />
                  </td>
                  <td>{payed.payId}</td>
                  <td>{payed.amount}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${payed.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${payed.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${payed.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="myappApp.payed.home.notFound">No Payeds found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ payed }: IRootState) => ({
  payedList: payed.entities,
  loading: payed.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Payed);
