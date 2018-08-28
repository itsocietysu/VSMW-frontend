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

export const Image = (src, num, width) => (
  <img src={src} alt={`${num}`} style={{ maxWidth: width }} />
);

const marks = {
  0: Image('/0-100x100.png', 0, '50px'),
  25: Image('/25-100x100.png', 25, '50px'),
  50: Image('/50-100x100.png', 50, '50px'),
  75: Image('/75-100x100.png', 75, '50px'),
  100: Image('/100-100x100.png', 100, '50px'),
};

class CustomizedSlider extends React.Component {
  componentDidMount() {
    if (this.props.defaultValue && this.props.value !== this.props.defaultValue)
      this.props.onChangeValue(this.props.defaultValue);
  }
  render() {
    const { value } = this.props;
    const percent = value / 100;
    return (
      <Slider
        value={value}
        onChange={this.props.onChangeValue}
        onAfterChange={this.props.onAfterChange}
        marks={marks}
        step={null}
        trackStyle={{
          background: `linear-gradient(to right, white,
          rgb(
            ${255 * (1 - percent) + 255 * percent},
            ${255 * (1 - percent)},
            ${255 * (1 - percent)}
            )
          )`,
        }}
        handleStyle={[
          {
            borderColor: 'red',
            backgroundImage: 'url(/icon-50x50.jpg)',
            backgroundSize: 'contain',
            height: 56,
            width: 56,
            marginLeft: -28,
            marginTop: -40,
            backgroundColor: 'white',
          },
        ]}
        railStyle={{}}
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
