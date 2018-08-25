import React from 'react';

import RedirectPage from 'containers/RedirectPage/Loadable';
import SessionPage from 'containers/SessionPage/Loadable';
import ViewPage from 'containers/ViewPage/Loadable';

import { Redirect } from 'react-router-dom';

class Route {
  path: string;
  exact: boolean;
  component: any;
}

const RedirectRoute = (() => {
  const r = new Route();
  r.path = '/';
  r.exact = true;
  r.component = () => <RedirectPage />;
  return r;
})();

const SessionRoute = (() => {
  const r = new Route();
  r.path = '/session/:id';
  r.exact = false;
  r.component = params => <SessionPage {...params} />;
  return r;
})();

const ViewRoute = (() => {
  const r = new Route();
  r.path = '/view/:id';
  r.exact = false;
  r.component = params => <ViewPage {...params} />;
  return r;
})();

const NotFoundRoute = (() => {
  const r = new Route();
  r.path = '';
  r.exact = false;
  r.component = () => <Redirect to="/" />;
  return r;
})();

const routes: Array<Route> = [
  RedirectRoute,
  SessionRoute,
  ViewRoute,
  NotFoundRoute,
];

export default routes;
