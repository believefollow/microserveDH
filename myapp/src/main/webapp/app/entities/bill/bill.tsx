import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './bill.reducer';
import { IBill } from 'app/shared/model/bill.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBillProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Bill = (props: IBillProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { billList, match, loading } = props;
  return (
    <div>
      <h2 id="bill-heading">
        <Translate contentKey="myappApp.bill.home.title">Bills</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myappApp.bill.home.createLabel">Create new Bill</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {billList && billList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.bill.balance">Balance</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.bill.finished">Finished</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.bill.receipt">Receipt</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.bill.subBill">Sub Bill</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.bill.payed">Payed</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {billList.map((bill, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${bill.id}`} color="link" size="sm">
                      {bill.id}
                    </Button>
                  </td>
                  <td>{bill.balance}</td>
                  <td>{bill.finished ? 'true' : 'false'}</td>
                  <td>{bill.receipt ? <Link to={`receipt/${bill.receipt.id}`}>{bill.receipt.id}</Link> : ''}</td>
                  <td>{bill.subBill ? <Link to={`sub-bill/${bill.subBill.id}`}>{bill.subBill.id}</Link> : ''}</td>
                  <td>{bill.payed ? <Link to={`payed/${bill.payed.id}`}>{bill.payed.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bill.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bill.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bill.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="myappApp.bill.home.notFound">No Bills found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ bill }: IRootState) => ({
  billList: bill.entities,
  loading: bill.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Bill);
