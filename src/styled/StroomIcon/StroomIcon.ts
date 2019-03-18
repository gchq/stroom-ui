import styled from "styled-components";
import { StyleProps, Size } from "./types";

const DEFAULT_SIZE: Size = "lg";

const getSize = ({ size = DEFAULT_SIZE }: StyleProps) => {
  switch (size) {
    case "lg":
      return "1.5rem";
    case "sm":
      return "0.7rem";
  }
};

export const StroomIcon = styled.img`
  width: ${getSize};
  height: ${getSize};
  background-color: ${props => props.theme.backgroundColor};
`;

export default StroomIcon;
