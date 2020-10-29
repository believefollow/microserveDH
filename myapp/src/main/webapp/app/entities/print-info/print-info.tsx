import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './print-info.reducer';
import { IPrintInfo } from 'app/shared/model/print-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrintInfoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PrintInfo = (props: IPrintInfoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { printInfoList, match, loading } = props;
  return (
    <div>
      <h2 id="print-info-heading">
        <Translate contentKey="myappApp.printInfo.home.title">Print Infos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="myappApp.printInfo.home.createLabel">Create new Print Info</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {printInfoList && printInfoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.printInfo.baseInfo">Base Info</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.printInfo.bill">Bill</Translate>
                </th>
                <th>
                  <Translate contentKey="myappApp.printInfo.payed">Payed</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {printInfoList.map((printInfo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${printInfo.id}`} color="link" size="sm">
                      {printInfo.id}
                    </Button>
                  </td>
                  <td>{printInfo.baseInfo}</td>
                  <td>{printInfo.bill ? <Link to={`bill/${printInfo.bill.id}`}>{printInfo.bill.id}</Link> : ''}</td>
                  <td>{printInfo.payed ? <Link to={`payed/${printInfo.payed.id}`}>{printInfo.payed.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${printInfo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${printInfo.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${printInfo.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="myappApp.printInfo.home.notFound">No Print Infos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ printInfo }: IRootState) => ({
  printInfoList: printInfo.entities,
  loading: printInfo.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrintInfo);
