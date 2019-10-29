import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './custom-attribute.reducer';
import { ICustomAttribute } from 'app/shared/model/custom-attribute.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomAttributeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CustomAttribute extends React.Component<ICustomAttributeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { customAttributeList, match } = this.props;
    return (
      <div>
        <h2 id="custom-attribute-heading">
          <Translate contentKey="varoApp.customAttribute.home.title">Custom Attributes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="varoApp.customAttribute.home.createLabel">Create a new Custom Attribute</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {customAttributeList && customAttributeList.length > 0 ? (
            <Table responsive aria-describedby="custom-attribute-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="varoApp.customAttribute.key">Key</Translate>
                  </th>
                  <th>
                    <Translate contentKey="varoApp.customAttribute.value">Value</Translate>
                  </th>
                  <th>
                    <Translate contentKey="varoApp.customAttribute.offer">Offer</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {customAttributeList.map((customAttribute, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${customAttribute.id}`} color="link" size="sm">
                        {customAttribute.id}
                      </Button>
                    </td>
                    <td>{customAttribute.key}</td>
                    <td>{customAttribute.value}</td>
                    <td>{customAttribute.offer ? <Link to={`offer/${customAttribute.offer.id}`}>{customAttribute.offer.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${customAttribute.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${customAttribute.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${customAttribute.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="varoApp.customAttribute.home.notFound">No Custom Attributes found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ customAttribute }: IRootState) => ({
  customAttributeList: customAttribute.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomAttribute);
