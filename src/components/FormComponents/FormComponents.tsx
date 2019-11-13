import * as React from "react";
import styled from "styled-components";
import { Tooltip } from "antd";

const requiredFieldText = "This field is required.";

export const ValidationMessage = styled.span`
  color: red;
`;

export const RequiredFieldMessage = () => (
  <ValidationMessage>{requiredFieldText}</ValidationMessage>
);

export const MandatoryIndicator = () => (
  <Tooltip title={requiredFieldText}>
    <ValidationMessage>*</ValidationMessage>
  </Tooltip>
);
