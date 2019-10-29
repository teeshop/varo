import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CustomAttribute from './custom-attribute';
import CustomAttributeDetail from './custom-attribute-detail';
import CustomAttributeUpdate from './custom-attribute-update';
import CustomAttributeDeleteDialog from './custom-attribute-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomAttributeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustomAttributeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomAttributeDetail} />
      <ErrorBoundaryRoute path={match.url} component={CustomAttribute} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CustomAttributeDeleteDialog} />
  </>
);

export default Routes;
