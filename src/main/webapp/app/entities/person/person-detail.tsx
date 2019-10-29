import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './person.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPersonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PersonDetail extends React.Component<IPersonDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { personEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="varoApp.person.detail.title">Person</Translate> [<b>{personEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="firstname">
                <Translate contentKey="varoApp.person.firstname">Firstname</Translate>
              </span>
            </dt>
            <dd>{personEntity.firstname}</dd>
            <dt>
              <span id="lastname">
                <Translate contentKey="varoApp.person.lastname">Lastname</Translate>
              </span>
            </dt>
            <dd>{personEntity.lastname}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="varoApp.person.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{personEntity.phone}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="varoApp.person.email">Email</Translate>
              </span>
            </dt>
            <dd>{personEntity.email}</dd>
            <dt>
              <Translate contentKey="varoApp.person.company">Company</Translate>
            </dt>
            <dd>{personEntity.company ? personEntity.company.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/person" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/person/${personEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ person }: IRootState) => ({
  personEntity: person.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonDetail);
