import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sub-bill-good.reducer';
import { ISubBillGood } from 'app/shared/model/sub-bill-good.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubBillGoodProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const SubBillGood = (props: ISubBillGoodProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { subBillGoodList, match, loading } = props;
  return (
    <div>
      <h2 id="sub-bill-good-heading">
        <Translate contentKey="myappApp.subBillGood.home.title">Sub Bill Goods</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myappApp.subBillGood.home.createLabel">Create new Sub Bill Good</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {subBillGoodList && subBillGoodList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.subBillGood.number">Number</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.subBillGood.total">Total</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.subBillGood.good">Good</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {subBillGoodList.map((subBillGood, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${subBillGood.id}`} color="link" size="sm">
                      {subBillGood.id}
                    </Button>
                  </td>
                  <td>{subBillGood.number}</td>
                  <td>{subBillGood.total}</td>
                  <td>{subBillGood.good ? <Link to={`storage/${subBillGood.good.id}`}>{subBillGood.good.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${subBillGood.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${subBillGood.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${subBillGood.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="myappApp.subBillGood.home.notFound">No Sub Bill Goods found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ subBillGood }: IRootState) => ({
  subBillGoodList: subBillGood.entities,
  loading: subBillGood.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubBillGood);
