/*
 * ViewPage
 *
 * This is the page for session, at the '/view/:id' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Redirect } from 'react-router-dom';

// import styled from 'styled-components';

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

import './view.css';

/* eslint-disable react/prefer-stateless-function */
export class ViewPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      func: setInterval(() => {
        if (!props.loading) props.initSession(props.match.params.id);
      }, 1000),
    };
  }
  componentWillUnmount() {
    clearInterval(this.state.func);
  }
  render() {
    const { loading, error, session } = this.props;
    let content;
    if (loading && !session) content = <LoadingIndicator />;
    else if (error) {
      if (error.message === 'No session') content = <Redirect to="/" />;
      else content = <div>{error.message}</div>;
    } else if (session) {
      content = (
        <div className="Component">
          <h1 className="yes">{session.title}</h1>
          {session.type === 'slider' && (
            <div>
              <h1 className="yes">{`Average: ${session.stats[0]}`}</h1>
              <h1 className="yes">{`Count: ${session.stats[1]}`}</h1>
            </div>
          )}
          {session.type === 'poll' && (
            <div>
              <h1 className="yes">{`Да: ${session.stats[0]}`}</h1>
              <h1 className="no">{`Нет: ${session.stats[1]}`}</h1>
            </div>
          )}
          <img
            className="img-left"
            src="/logo_vsmysle_2018.svg"
            alt="Форум ВСМЫСЛЕ"
          />
          <img className="img-right" src="/logo-dark.svg" alt="ITS" />
        </div>
      );
    } else content = null;
    return (
      <article>
        <Helmet>
          <title>View Page</title>
          <meta
            name="description"
            content="An VSMW application page for view stats of session"
          />
        </Helmet>
        {content}
      </article>
    );
  }
}

ViewPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  initSession: PropTypes.func,
  match: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    initSession: id => dispatch(getSession(id)),
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

const withReducer = injectReducer({ key: 'stats', reducer });
const withSaga = injectSaga({ key: 'stats', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ViewPage);
