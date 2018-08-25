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

import styled from 'styled-components';

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

const Slider = styled.div`
  height: ${props => `${props.value * 5.5}px`};
  background-color: ${props => props.color};
  position: absolute;
  bottom: 0;
  width: inherit;
`;

const Circle = styled.div`
  width: 300px;
  height: 300px;
  text-align: center;
  border: 2px ${props => props.color} dotted;
  border-radius: 100%;
  line-height: 300px;
  margin-top: 150px;
`;

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
      content = <Redirect to="/" />;
    } else if (session) {
      content = (
        <div className="component">
          <h1 className="title yes">{session.title}</h1>
          {session.type === 'slider' && (
            <div className="flex">
              <Circle color="#BD2B2C">
                <h1 className="no">{`${session.stats[0]}%`}</h1>
              </Circle>
            </div>
          )}
          {session.type === 'poll' && (
            <div className="flex">
              <div>
                <Circle color="#BD2B2C">
                  <h1 className="no">{`${session.stats[1]}%`}</h1>
                </Circle>
              </div>
              <div className="column no">
                <div className="block">
                  <Slider value={session.stats[1]} color="#BD2B2C" />
                </div>
                <h1>Нет</h1>
              </div>
              <div className="column yes">
                <div className="block">
                  <Slider value={session.stats[0]} color="#28385B" />
                </div>
                <h1>Да</h1>
              </div>
              <Circle color="#28385B">
                <h1 className="yes">{`${session.stats[0]}%`}</h1>
              </Circle>
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
    } else content = <LoadingIndicator />;
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
