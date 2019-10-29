import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './custom-attribute.reducer';
import { ICustomAttribute } from 'app/shared/model/custom-attribute.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomAttributeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CustomAttributeDetail extends React.Component<ICustomAttributeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { customAttributeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="varoApp.customAttribute.detail.title">CustomAttribute</Translate> [<b>{customAttributeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="key">
                <Translate contentKey="varoApp.customAttribute.key">Key</Translate>
              </span>
            </dt>
            <dd>{customAttributeEntity.key}</dd>
            <dt>
              <span id="value">
                <Translate contentKey="varoApp.customAttribute.value">Value</Translate>
              </span>
            </dt>
            <dd>{customAttributeEntity.value}</dd>
            <dt>
              <Translate contentKey="varoApp.customAttribute.offer">Offer</Translate>
            </dt>
            <dd>{customAttributeEntity.offer ? customAttributeEntity.offer.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/custom-attribute" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/custom-attribute/${customAttributeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ customAttribute }: IRootState) => ({
  customAttributeEntity: customAttribute.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomAttributeDetail);
