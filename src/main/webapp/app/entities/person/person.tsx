import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPersonProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Person extends React.Component<IPersonProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { personList, match } = this.props;
    return (
      <div>
        <h2 id="person-heading">
          <Translate contentKey="varoApp.person.home.title">People</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="varoApp.person.home.createLabel">Create a new Person</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {personList && personList.length > 0 ? (
            <Table responsive aria-describedby="person-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="varoApp.person.firstname">Firstname</Translate>
                  </th>
                  <th>
                    <Translate contentKey="varoApp.person.lastname">Lastname</Translate>
                  </th>
                  <th>
                    <Translate contentKey="varoApp.person.phone">Phone</Translate>
                  </th>
                  <th>
                    <Translate contentKey="varoApp.person.email">Email</Translate>
                  </th>
                  <th>
                    <Translate contentKey="varoApp.person.company">Company</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {personList.map((person, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${person.id}`} color="link" size="sm">
                        {person.id}
                      </Button>
                    </td>
                    <td>{person.firstname}</td>
                    <td>{person.lastname}</td>
                    <td>{person.phone}</td>
                    <td>{person.email}</td>
                    <td>{person.company ? <Link to={`company/${person.company.id}`}>{person.company.name}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${person.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${person.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${person.id}/delete`} color="danger" size="sm">
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
            <div className="alert alert-warning">
              <Translate contentKey="varoApp.person.home.notFound">No People found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ person }: IRootState) => ({
  personList: person.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Person);
