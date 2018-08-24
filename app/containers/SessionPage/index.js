/* eslint-disable react/no-unused-prop-types */
/*
 * SessionPage
 *
 * This is the page for session, at the '/session/:id' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Fingerprint2 from 'fingerprintjs2';
import { getUniqID, setUniqID } from '../../cookieManager';

import LoadingIndicator from '../../components/LoadingIndicator';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectVote,
} from './selectors';
import { makeSelectSession } from '../RedirectPage/selectors';
import { sendUniqID, getVote } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class SessionPage extends React.PureComponent {
  componentDidMount() {
    if (!getUniqID()) this.props.createID();
    else this.props.init();
  }
  componentDidUpdate() {
    const { loading, error, vote } = this.props;
    if (!loading && !error && !vote) this.props.init();
  }
  render() {
    const { loading, error, vote, session } = this.props;
    let content;
    if (loading) content = <LoadingIndicator />;
    else if (error) {
      content = <div>Всё плохо</div>;
    } else if (vote)
      content = (
        <div>
          <div>{`session: ${session[0].eid}`}</div>
          <div>{`vote: ${vote[0].eid}`}</div>
        </div>
      );
    else content = null;
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
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  vote: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]), // TODO: change on number
  session: PropTypes.array, // TODO: change on object
  init: PropTypes.func,
  createID: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(getVote()),
    createID: () => {
      new Fingerprint2().get(result => {
        setUniqID(result);
        dispatch(sendUniqID());
      });
    },
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
