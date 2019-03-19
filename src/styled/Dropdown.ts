import styled from "styled-components";

export const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const StyledDropdownContent = styled.div`
  width: 100%;
  display: none;
  position: absolute;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  ${StyledDropdown}:focus-within & {
    display: flex;
    flex-direction: column;
  }
`;
