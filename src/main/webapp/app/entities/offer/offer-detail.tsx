import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './offer.reducer';
import { IOffer } from 'app/shared/model/offer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOfferDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class OfferDetail extends React.Component<IOfferDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { offerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="varoApp.offer.detail.title">Offer</Translate> [<b>{offerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="caption">
                <Translate contentKey="varoApp.offer.caption">Caption</Translate>
              </span>
            </dt>
            <dd>{offerEntity.caption}</dd>
            <dt>
              <span id="language">
                <Translate contentKey="varoApp.offer.language">Language</Translate>
              </span>
            </dt>
            <dd>{offerEntity.language}</dd>
            <dt>
              <span id="offerDate">
                <Translate contentKey="varoApp.offer.offerDate">Offer Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={offerEntity.offerDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="varoApp.offer.template">Template</Translate>
            </dt>
            <dd>{offerEntity.template ? offerEntity.template.caption : ''}</dd>
            <dt>
              <Translate contentKey="varoApp.offer.customer">Customer</Translate>
            </dt>
            <dd>
              {offerEntity.customers
                ? offerEntity.customers.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === offerEntity.customers.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="varoApp.offer.customerManager">Customer Manager</Translate>
            </dt>
            <dd>
              {offerEntity.customerManagers
                ? offerEntity.customerManagers.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.lastname}</a>
                      {i === offerEntity.customerManagers.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="varoApp.offer.vendor">Vendor</Translate>
            </dt>
            <dd>
              {offerEntity.vendors
                ? offerEntity.vendors.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === offerEntity.vendors.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="varoApp.offer.vendorManager">Vendor Manager</Translate>
            </dt>
            <dd>
              {offerEntity.vendorManagers
                ? offerEntity.vendorManagers.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.lastname}</a>
                      {i === offerEntity.vendorManagers.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/offer" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/offer/${offerEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ offer }: IRootState) => ({
  offerEntity: offer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferDetail);
