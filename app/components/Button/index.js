/**
 *
 * Button.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import StyledButton from './StyledButton';

function Button(props) {
  return (
    <StyledButton
      type="button"
      onClick={() => props.active && props.onClick()}
      color={props.color}
      active={props.active}
    >
      {props.children}
    </StyledButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.object,
  color: PropTypes.string,
  active: PropTypes.bool,
};

export default Button;
