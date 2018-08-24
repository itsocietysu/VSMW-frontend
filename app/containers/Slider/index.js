/* eslint-disable react/prefer-stateless-function,react/prop-types */
/*
 * Slider
 *
 * This is slider component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import injectReducer from '../../utils/injectReducer';
import { changeValue } from './actions';
import { makeSelectValue } from './selectors';
import reducer from './reducer';

class CustomizedSlider extends React.Component {
  componentDidUpdate() {
    if (this.props.defaultValue && this.props.value !== this.props.defaultValue)
      this.props.onChangeValue(this.props.defaultValue);
  }
  render() {
    return (
      <Slider
        value={this.props.value}
        onChange={this.props.onChangeValue}
        onAfterChange={this.props.onAfterChange}
        trackStyle={{
          background: 'linear-gradient(to right, white, red)',
          height: 10,
        }}
        handleStyle={[
          {
            borderColor: 'red',
            backgroundImage: 'url(/icon-50x50.jpg)',
            height: 56,
            width: 56,
            marginLeft: -14,
            marginTop: -20,
            backgroundColor: 'white',
          },
        ]}
        railStyle={{ height: 10 }}
        disabled={this.props.disabled}
      />
    );
  }
}

CustomizedSlider.protoTypes = {
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  onChangeValue: PropTypes.func,
  onAfterChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeValue: value => dispatch(changeValue(value)),
  };
}

const mapStateToProps = createStructuredSelector({
  value: makeSelectValue(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'slider', reducer });

export default compose(
  withReducer,
  withConnect,
)(CustomizedSlider);
