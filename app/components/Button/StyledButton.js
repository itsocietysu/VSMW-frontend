import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.25em 0.5em;
  margin: 10px;
  text-decoration: none;
  cursor: default;
  outline: 0;
  font-family: 'Arial Black', serif;
  font-weight: bold;
  font-size: 14px;
  border-radius: 10px;
  width: 140px;
  ${props =>
    props.active &&
    `
  color: ${props.color};
  background: white;
  cursor: pointer;
  border: 5px ${props.color} solid;

  &:hover {
    background: ${props.color};
    color: white;
    border: 5px white double;
  } `};
  ${props =>
    props.clicked
      ? `
  background: ${props.color};
    color: white;
    border: 5px white double;
  `
      : `color: ${props.color};
  background: white;
  border: 5px ${props.color} solid;`};
`;

export default StyledButton;
