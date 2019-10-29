import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITemplate } from 'app/shared/model/template.model';
import { getEntities as getTemplates } from 'app/entities/template/template.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { getEntity, updateEntity, createEntity, reset } from './offer.reducer';
import { IOffer } from 'app/shared/model/offer.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOfferUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IOfferUpdateState {
  isNew: boolean;
  idscustomer: any[];
  idsvendor: any[];
  idscustomerManager: any[];
  idsvendorManager: any[];
  templateId: string;
}

export class OfferUpdate extends React.Component<IOfferUpdateProps, IOfferUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscustomer: [],
      idsvendor: [],
      idscustomerManager: [],
      idsvendorManager: [],
      templateId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTemplates();
    this.props.getCompanies();
    this.props.getPeople();
  }

  saveEntity = (event, errors, values) => {
    values.offerDate = convertDateTimeToServer(values.offerDate);

    if (errors.length === 0) {
      const { offerEntity } = this.props;
      const entity = {
        ...offerEntity,
        ...values,
        customers: mapIdList(values.customers),
        vendors: mapIdList(values.vendors),
        customerManagers: mapIdList(values.customerManagers),
        vendorManagers: mapIdList(values.vendorManagers)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/offer');
  };

  render() {
    const { offerEntity, templates, companies, people, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="varoApp.offer.home.createOrEditLabel">
              <Translate contentKey="varoApp.offer.home.createOrEditLabel">Create or edit a Offer</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : offerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="offer-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="offer-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="captionLabel" for="offer-caption">
                    <Translate contentKey="varoApp.offer.caption">Caption</Translate>
                  </Label>
                  <AvField id="offer-caption" type="text" name="caption" />
                </AvGroup>
                <AvGroup>
                  <Label id="languageLabel" for="offer-language">
                    <Translate contentKey="varoApp.offer.language">Language</Translate>
                  </Label>
                  <AvInput
                    id="offer-language"
                    type="select"
                    className="form-control"
                    name="language"
                    value={(!isNew && offerEntity.language) || 'GERMAN'}
                  >
                    <option value="GERMAN">{translate('varoApp.Language.GERMAN')}</option>
                    <option value="ENGLISH">{translate('varoApp.Language.ENGLISH')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="offerDateLabel" for="offer-offerDate">
                    <Translate contentKey="varoApp.offer.offerDate">Offer Date</Translate>
                  </Label>
                  <AvInput
                    id="offer-offerDate"
                    type="datetime-local"
                    className="form-control"
                    name="offerDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.offerEntity.offerDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="offer-template">
                    <Translate contentKey="varoApp.offer.template">Template</Translate>
                  </Label>
                  <AvInput id="offer-template" type="select" className="form-control" name="template.id">
                    <option value="" key="0" />
                    {templates
                      ? templates.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.caption}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="offer-customer">
                    <Translate contentKey="varoApp.offer.customer">Customer</Translate>
                  </Label>
                  <AvInput
                    id="offer-customer"
                    type="select"
                    multiple
                    className="form-control"
                    name="customers"
                    value={offerEntity.customers && offerEntity.customers.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {companies
                      ? companies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="offer-customerManager">
                    <Translate contentKey="varoApp.offer.customerManager">Customer Manager</Translate>
                  </Label>
                  <AvInput
                    id="offer-customerManager"
                    type="select"
                    multiple
                    className="form-control"
                    name="customerManagers"
                    value={offerEntity.customerManagers && offerEntity.customerManagers.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {people
                      ? people.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.lastname}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="offer-vendor">
                    <Translate contentKey="varoApp.offer.vendor">Vendor</Translate>
                  </Label>
                  <AvInput
                    id="offer-vendor"
                    type="select"
                    multiple
                    className="form-control"
                    name="vendors"
                    value={offerEntity.vendors && offerEntity.vendors.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {companies
                      ? companies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="offer-vendorManager">
                    <Translate contentKey="varoApp.offer.vendorManager">Vendor Manager</Translate>
                  </Label>
                  <AvInput
                    id="offer-vendorManager"
                    type="select"
                    multiple
                    className="form-control"
                    name="vendorManagers"
                    value={offerEntity.vendorManagers && offerEntity.vendorManagers.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {people
                      ? people.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.lastname}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/offer" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  templates: storeState.template.entities,
  companies: storeState.company.entities,
  people: storeState.person.entities,
  offerEntity: storeState.offer.entity,
  loading: storeState.offer.loading,
  updating: storeState.offer.updating,
  updateSuccess: storeState.offer.updateSuccess
});

const mapDispatchToProps = {
  getTemplates,
  getCompanies,
  getPeople,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferUpdate);
