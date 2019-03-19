import styled from "./styled-components";

export const StyledButton = styled.button`
  border: ${({ theme }) => theme.iconButton_border}
  background-color: ${({ theme }) => theme.iconButton_backgroundColor}
  color: ${({ theme }) => theme.iconButton_color}

  &.selected {
    background-color: ${({ theme }) => theme.selectedColor}
  }

  &:hover:enabled,
  &:focus:enabled {
    color: ${({ theme }) => theme.iconButton_color_hover}
    background-color: ${({ theme }) => theme.iconButton_backgroundColor_hover}
  }

  &.raised-high:hover:enabled,
  &.raised-high:focus:enabled {
    color: ${({ theme }) => theme.textColor_deemphasised}
    background-color: ${({ theme }) => theme.raisedHigh_selectedBackgroundColor}

  }

  &:disalbed
  &[disabled] {
    background-color: #cccccc;
    color: #666666;
  }
`;
