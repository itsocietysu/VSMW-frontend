/* eslint-disable react/no-children-prop,no-unused-expressions,react/no-did-mount-set-state */
/*
 * SessionPage
 *
 * This is the component/page for vote
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Redirect } from 'react-router-dom';

import styled from 'styled-components';

import Fingerprint2 from 'fingerprintjs2';
import { getUniqID, setUniqID } from '../../cookieManager';

import Button from '../../components/Button';
import LoadingIndicator from '../../components/LoadingIndicator';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import Slider from '../Slider';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectSession,
  makeSelectVote,
} from './selectors';
import { getSession, getVote, sendVote } from './actions';
import reducer from './reducer';
import saga from './saga';

import './session.css';

const Component = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  text-align: center;
  background: url(${props => props.image}) no-repeat 50%;
  background-size: contain;
  @media screen and (max-width: 1080px) {
    background-size: cover;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class SessionPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      func: false,
    };
  }
  componentDidMount() {
    if (this.props.id) {
      if (!getUniqID()) this.props.createID();
      this.props.initSession(this.props.id);
      this.setState({
        func: setInterval(() => {
          if (
            getUniqID() &&
            this.props.vote.fingerprint !== getUniqID() &&
            !this.props.error
          )
            this.props.initVote();
        }, 500),
      });
    } else if (this.props.match.params.id) {
      this.props.initSession(this.props.match.params.id);
    }
  }
  componentWillUnmount() {
    if (this.state.func) clearInterval(this.state.func);
  }
  componentDidUpdate(prevProps) {
    if (this.props.id) {
      if (prevProps.id !== this.props.id) {
        this.componentDidMount();
      }
      if (
        getUniqID() &&
        this.props.vote.fingerprint === getUniqID() &&
        this.state.func
      ) {
        clearInterval(this.state.func);
        this.state.func = false;
      }
    }
  }
  render() {
    const { loading, error, vote, session, id } = this.props;
    let content;
    if (loading && !session && !vote.fingerprint)
      content = <LoadingIndicator />;
    else if (error) {
      content = <Redirect to="/" />;
    } else if (session && (id ? vote.fingerprint : true)) {
      content = (
        <Component image={`http://${session.image}`}>
          <h1 className="title">{session.title}</h1>
          {vote.value !== -1 && (
            <p className={`p ${session.type}`}>ВАШ ГОЛОС УЧТЕН :)</p>
          )}
          {session.type === 'slider' && (
            <Slider
              disabled={id ? vote.value !== -1 : true}
              defaultValue={vote.value === -1 ? 0 : vote.value}
              onAfterChange={value => this.props.sendVote(value)}
            />
          )}
          {session.type === 'poll' && (
            <div className="flex">
              <Button
                color="#28385B"
                onClick={() => {
                  id && this.props.sendVote(100);
                }}
                active={id ? vote.value === -1 : false}
                clicked={vote.value === 100}
                children={<h1 className="buttonText">ДА</h1>}
              />
              <Button
                color="#BD2B2C"
                onClick={() => {
                  id && this.props.sendVote(0);
                }}
                active={id ? vote.value === -1 : false}
                clicked={vote.value === 0}
                children={<h1 className="buttonText">НЕТ</h1>}
              />
            </div>
          )}
        </Component>
      );
    } else content = <LoadingIndicator />;
    return (
      <article>
        <Helmet>
          <title>Session Page</title>
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

SessionPage.propTypes = {
  id: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  vote: PropTypes.object,
  session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  initVote: PropTypes.func,
  initSession: PropTypes.func,
  sendVote: PropTypes.func,
  createID: PropTypes.func,
  match: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    initVote: () => dispatch(getVote()),
    initSession: id => dispatch(getSession(id)),
    createID: () => {
      new Fingerprint2().get(result => {
        setUniqID(result);
      });
    },
    sendVote: value => dispatch(sendVote(value)),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  vote: makeSelectVote(),
  session: makeSelectSession(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'vote', reducer });
const withSaga = injectSaga({ key: 'vote', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SessionPage);
