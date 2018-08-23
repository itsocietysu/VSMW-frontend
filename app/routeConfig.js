import React from 'react';
import RedirectPage from 'containers/RedirectPage/Loadable';

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
/*
const SessionRoute = (() => {
  const r = new Route();
  r.path = '/session/:id';
  r.exact = false;
  r.component = ({ match }) => SessionPage;
  return r;
})();

const ViewRoute = (() => {
  const r = new Route();
  r.path = '/view/:id';
  r.exact = false;
  r.component = ({ match }) => ViewPage;
  return r;
})();
*/
const routes: Array<Route> = [RedirectRoute]; // , SessionRoute, ViewRoute];

export default routes;
