import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.25em 0.5em;
  margin: 0;
  text-decoration: none;
  cursor: default;
  outline: 0;
  font-family: 'Arial Black', serif;
  font-weight: bold;
  font-size: 16px;
  ${props =>
    props.active &&
    `
  color: black;
  background: white;
  cursor: pointer;

  &:hover {
    background: ${props.color};
    color: #fff;
  } `};
  ${props =>
    props.clicked
      ? `
  background: ${props.color};
    color: #fff;
  `
      : `color: black;
  background: white;`};
`;

export default StyledButton;
