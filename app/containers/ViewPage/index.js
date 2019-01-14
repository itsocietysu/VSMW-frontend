/* eslint-disable react/no-array-index-key,no-return-assign,no-multi-assign */
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
    const isSlider = view === 'slider';
    const Class = classes[index] ? classes[index] : classes[0];
    const color = colors[index] ? colors[index] : colors[0];
    array[index] = (
      <div
        className={`column ${Class}`}
        key={`column-${Class}-${value}-${index}`}
      >
        <div className={`block ${view}`}>
          <Slider value={value} color={color} />
          {isSlider && (
            <h1
              className={`textSlider ${value < 9 ? 'yes' : 'more'}`}
            >{`${Math.round(value)}%`}</h1>
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
        if (!this.props.loading) props.initSession(props.match.params.id);
      }, 1000),
      slidersFunc: false,
      stats: false,
      maxStats: false,
    };
  }
  componentWillUnmount() {
    clearInterval(this.state.func);
  }
  componentWillUpdate(props) {
    if (props.session && !props.loading) {
      if (!this.state.stats) {
        this.state.stats = [];
        this.state.maxStats = [];
        props.session.stats.forEach(
          (stat, index) =>
            (this.state.stats[index] = this.state.maxStats[index] = stat),
        );
        this.forceUpdate();
      } else {
        if (!this.state.slidersFunc) this.state.slidersFunc = [];
        props.session.stats.forEach((stat, index) => {
          if (this.state.maxStats[index] !== stat) {
            clearInterval(this.state.slidersFunc[index]);
            const dif = (stat - this.state.stats[index]) / 9;
            this.state.maxStats[index] = stat;
            this.state.slidersFunc[index] = setInterval(() => {
              if (this.state.stats[index] !== this.state.maxStats[index]) {
                this.state.stats[index] += dif;
                if (
                  Math.abs(
                    this.state.stats[index] - this.state.maxStats[index],
                  ) < Math.abs(dif)
                )
                  this.state.stats[index] = this.state.maxStats[index];
                this.forceUpdate();
              }
            }, 100);
          } else if (
            this.state.stats[index] === stat &&
            this.state.slidersFunc[index]
          ) {
            clearInterval(this.state.slidersFunc[index]);
          }
        });
      }
    }
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
                this.state.stats,
                [
                  Image('/0-256x256.png', 0, '6vw'),
                  Image('/25-256x256.png', 25, '6vw'),
                  Image('/50-256x256.png', 50, '6vw'),
                  Image('/75-256x256.png', 75, '6vw'),
                  Image('/100-256x256.png', 100, '6vw'),
                ],
                ['no'],
                ['#D1262D'],
                'slider',
              )}
            </div>
          )}
          {session.type === 'poll' && (
            <div className="flex">
              <div>
                <Circle color="#BD2B2C">
                  <h1 className="no">{`${Math.round(
                    this.state.stats[1],
                  )}%`}</h1>
                </Circle>
              </div>
              {columns(
                [this.state.stats[1], this.state.stats[0]],
                [<h1>НЕТ</h1>, <h1>ДА</h1>],
                ['no', 'yes'],
                ['#BD2B2C', '#FFFFFF'],
                'poll',
              )}
              <div>
                <Circle color="#FFFFFF">
                  <h1 className="yes">{`${Math.round(
                    this.state.stats[0],
                  )}%`}</h1>
                </Circle>
              </div>
            </div>
          )}
          <img className="img-left" src="/logo-sirius.png" alt="Science Slam" />
          <img className="img-right" src="/logo-white.svg" alt="ITS" />
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
