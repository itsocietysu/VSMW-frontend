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
  border: 5px ${props => props.color} dashed;
  ${props =>
    props.active &&
    `
  color: ${props.color};
  background: white;
  cursor: pointer;

  &:hover {
    background: ${props.color};
    color: white;
  } `};
  ${props =>
    props.clicked
      ? `
  background: ${props.color};
    color: white;
  `
      : `color: ${props.color};
  background: white;`};
`;

export default StyledButton;
