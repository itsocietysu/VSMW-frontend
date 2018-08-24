/* eslint-disable react/no-array-index-key */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import routes from 'routeConfig';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  background-color: white;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - VSMW" defaultTitle="VSMW">
        <meta name="description" content="An VSMW application" />
      </Helmet>
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    </AppWrapper>
  );
}
