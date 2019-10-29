import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Template from './template';
import TemplateDetail from './template-detail';
import TemplateUpdate from './template-update';
import TemplateDeleteDialog from './template-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TemplateDetail} />
      <ErrorBoundaryRoute path={match.url} component={Template} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TemplateDeleteDialog} />
  </>
);

export default Routes;
