import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOffer } from 'app/shared/model/offer.model';
import { getEntities as getOffers } from 'app/entities/offer/offer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './custom-attribute.reducer';
import { ICustomAttribute } from 'app/shared/model/custom-attribute.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomAttributeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICustomAttributeUpdateState {
  isNew: boolean;
  offerId: string;
}

export class CustomAttributeUpdate extends React.Component<ICustomAttributeUpdateProps, ICustomAttributeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      offerId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getOffers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { customAttributeEntity } = this.props;
      const entity = {
        ...customAttributeEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/custom-attribute');
  };

  render() {
    const { customAttributeEntity, offers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="varoApp.customAttribute.home.createOrEditLabel">
              <Translate contentKey="varoApp.customAttribute.home.createOrEditLabel">Create or edit a CustomAttribute</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : customAttributeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="custom-attribute-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="custom-attribute-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="keyLabel" for="custom-attribute-key">
                    <Translate contentKey="varoApp.customAttribute.key">Key</Translate>
                  </Label>
                  <AvField id="custom-attribute-key" type="text" name="key" />
                </AvGroup>
                <AvGroup>
                  <Label id="valueLabel" for="custom-attribute-value">
                    <Translate contentKey="varoApp.customAttribute.value">Value</Translate>
                  </Label>
                  <AvField id="custom-attribute-value" type="text" name="value" />
                </AvGroup>
                <AvGroup>
                  <Label for="custom-attribute-offer">
                    <Translate contentKey="varoApp.customAttribute.offer">Offer</Translate>
                  </Label>
                  <AvInput id="custom-attribute-offer" type="select" className="form-control" name="offer.id">
                    <option value="" key="0" />
                    {offers
                      ? offers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/custom-attribute" replace color="info">
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
  offers: storeState.offer.entities,
  customAttributeEntity: storeState.customAttribute.entity,
  loading: storeState.customAttribute.loading,
  updating: storeState.customAttribute.updating,
  updateSuccess: storeState.customAttribute.updateSuccess
});

const mapDispatchToProps = {
  getOffers,
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
)(CustomAttributeUpdate);
