/* eslint-disable react/no-array-index-key */
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

import { Image } from '../Slider/index';

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
  height: ${props => `${props.value}%`};
  background-color: ${props => props.color};
  position: absolute;
  bottom: 0;
  width: inherit;
`;

const Circle = styled.div`
  width: 20vh;
  height: 20vh;
  text-align: center;
  border: 2px ${props => props.color} dotted;
  border-radius: 100%;
  line-height: 20vh;
  margin-top: 20vh;
`;

function columns(values, names, classes, colors, view) {
  const array = [];
  values.forEach((value, index) => {
    array[index] = (
      <div
        className={`column ${classes[index] ? classes[index] : classes[0]}`}
        key={`column-${
          classes[index] ? classes[index] : classes[0]
        }-${value}-${index}`}
      >
        <div className={`block ${view}`}>
          <Slider
            value={value}
            color={`${colors[index] ? colors[index] : colors[0]}`}
          />
          {view === 'slider' && (
            <h1 className="textSlider yes">{`${value}%`}</h1>
          )}
        </div>
        {names[index]}
      </div>
    );
  });
  return array;
}

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
    if (error && error.message === 'No session') content = <Redirect to="/" />;
    else if (loading && !session) content = <LoadingIndicator />;
    else if (session) {
      content = (
        <div className="component">
          <h1 className="title yes">{session.title}</h1>
          {session.type === 'slider' && (
            <div className="flex">
              {columns(
                session.stats,
                [
                  Image('/0-256x256.png', 0, '6vw'),
                  Image('/25-256x256.png', 25, '6vw'),
                  Image('/50-256x256.png', 50, '6vw'),
                  Image('/75-256x256.png', 75, '6vw'),
                  Image('/100-256x256.png', 100, '6vw'),
                ],
                ['no'],
                ['#BD2B2C'],
                'slider',
              )}
            </div>
          )}
          {session.type === 'poll' && (
            <div className="flex">
              <div>
                <Circle color="#BD2B2C">
                  <h1 className="no">{`${session.stats[1]}%`}</h1>
                </Circle>
              </div>
              {columns(
                [session.stats[1], session.stats[0]],
                [<h1>НЕТ</h1>, <h1>ДА</h1>],
                ['no', 'yes'],
                ['#BD2B2C', '#28385B'],
                'poll',
              )}
              <div>
                <Circle color="#28385B">
                  <h1 className="yes">{`${session.stats[0]}%`}</h1>
                </Circle>
              </div>
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
  session: makeSelectSession(),
  error: makeSelectError(),
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
