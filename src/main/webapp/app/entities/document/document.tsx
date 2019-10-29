import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Document extends React.Component<IDocumentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { documentList, match } = this.props;
    return (
      <div>
        <h2 id="document-heading">
          <Translate contentKey="varoApp.document.home.title">Documents</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="varoApp.document.home.createLabel">Create a new Document</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {documentList && documentList.length > 0 ? (
            <Table responsive aria-describedby="document-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="varoApp.document.createdAt">Created At</Translate>
                  </th>
                  <th>
                    <Translate contentKey="varoApp.document.content">Content</Translate>
                  </th>
                  <th>
                    <Translate contentKey="varoApp.document.offer">Offer</Translate>
                  </th>
                  <th>
                    <Translate contentKey="varoApp.document.createdBy">Created By</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {documentList.map((document, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${document.id}`} color="link" size="sm">
                        {document.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={document.createdAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      {document.content ? (
                        <div>
                          <a onClick={openFile(document.contentContentType, document.content)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                          <span>
                            {document.contentContentType}, {byteSize(document.content)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{document.offer ? <Link to={`offer/${document.offer.id}`}>{document.offer.offerDate}</Link> : ''}</td>
                    <td>{document.createdBy ? document.createdBy.login : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${document.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${document.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${document.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="varoApp.document.home.notFound">No Documents found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ document }: IRootState) => ({
  documentList: document.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Document);
