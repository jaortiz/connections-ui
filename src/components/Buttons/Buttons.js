import styled from "styled-components";
import { Button } from "reactstrap";

// Need to fix this properly please...
export const PrimaryButton = styled(Button)`
  background-color: ${props =>
    props.white ? props.theme.color_white : props.theme.color_blue_3};
  color: ${props =>
    props.white ? props.theme.color_blue_3 : props.theme.color_white};
  padding: 6px 32px;
  font-size: 14px;
  font-weight: 400;
  border: 0;
  &:hover {
    background-color: ${props => props.theme.color_blue_4};
  }
`;
