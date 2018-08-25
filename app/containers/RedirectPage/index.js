/*
 * RedirectPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';

import LoadingIndicator from '../../components/LoadingIndicator';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectSession,
} from './selectors';
import { getSession } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class RedirectPage extends React.PureComponent {
  componentDidMount() {
    this.props.init();
  }
  render() {
    const { loading, error, session } = this.props;
    let content;
    if (loading) content = <LoadingIndicator />;
    else if (error) {
      content = <div>{error.message}</div>;
    } else if (session) content = <Redirect to={`/session/${session}`} />;
    else content = null;
    return (
      <article>
        <Helmet>
          <title>Redirect Page</title>
          <meta
            name="description"
            content="An VSMW application page for redirect"
          />
        </Helmet>
        {content}
      </article>
    );
  }
}

RedirectPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  session: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  init: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(getSession()),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  session: makeSelectSession(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'getSession', reducer });
const withSaga = injectSaga({ key: 'getSession', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RedirectPage);
