/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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

import SessionPage from '../SessionPage';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      func: false,
    };
  }
  componentDidMount() {
    this.props.init();
    this.state = {
      func: setInterval(() => {
        this.props.init();
      }, 2000),
    };
  }
  componentDidUpdate() {
    if (this.props.error)
      setTimeout(() => {
        this.props.init();
      }, 1200);
  }
  componentWillUnmount() {
    if (this.state.func) clearInterval(this.state.func);
  }
  render() {
    const { loading, error, session } = this.props;
    let content;
    if (loading && !session) content = <LoadingIndicator />;
    else if (error) {
      content = <LoadingIndicator />;
    } else if (session) content = <SessionPage />;
    else content = null;
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="An VSMW application page for vote"
          />
        </Helmet>
        {content}
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
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
)(HomePage);
