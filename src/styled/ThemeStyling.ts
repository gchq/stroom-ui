import styled, { css } from "./styled-components";

export const header = css`
  color: ${({ theme }) => theme.textColor};

  & > .icon {
    color: ${({ theme }) => theme.header_iconColor};
  }
`;

export const Table = styled.table`
  background-color: ${({ theme }) => theme.raisedLow_backgroundColor};
  color: ${({ theme }) => theme.textColor};
  border: ${({ theme }) => theme.border};

  & > td {
    color: ${({ theme }) => theme.textColor};
  }

  & > th {
    background-color: ${({ theme }) => theme.raisedLow_backgroundColor};
    color: ${({ theme }) => theme.textColor};
  }
`;

export const dropdownContent = css`
  background-color: ${({ theme }) => theme.backgroundColor};
`;
export const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
`;

export const StyledForm = styled.form`
  label {
    color: ${({ theme }) => theme.textColor}
  }

  input {
    background-color: ${({ theme }) => theme.backgroundColor}
    color: ${({ theme }) => theme.textColor}
  }
`;

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.backgroundColor}
  color: ${({ theme }) => theme.textColor}

  &.positive {
    background-color: ${({ theme }) => theme.selectedColor}
    color: ${({ theme }) => theme.textColor}
  }
`;

export const hoverable = css`
  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
`;

export const inFocus = css`
  background-color: ${({ theme }) => theme.raisedHigh_selectedBackgroundColor};
`;

export const raisedHigh = css`
  background-color: ${({ theme }) => theme.raisedHigh_backgroundColor};
  color: ${({ theme }) => theme.textColor} & .selected {
    background-colour: ${({ theme }) =>
      theme.raisedHigh_selectedBackgroundColor};
  }

  :focus & .inFocus {
    background-colour: ${({ theme }) =>
      theme.raisedHigh_selectedBackgroundColor};
  }
`;

export const flat = css`
  background-color: ${({ theme }) => theme.backgroundColor}
  color: ${({ theme }) => theme.textColor}
`;

export const flatText = css`
  color: ${({ theme }) => theme.textColor};
`;

export const raisedLow = css`
  background-color: ${({ theme }) => theme.raisedLow_backgroundColor}
  color: ${({ theme }) => theme.textColor}

`;

export const selected = css`
  background-color: ${({ theme }) => theme.selectedColor}

  &:hover {
    background-color: ${({ theme }) => theme.selectedColor}
  }
`;

export const focussed = css`
  border: solid thin ${({ theme }) => theme.focussedColor}

  &:hover {
    border: solid thin ${({ theme }) => theme.focussedColor}
  }
`;

export const border = css`
  border: ${({ theme }) => theme.border};
`;

export const raisedBorder = css`
  border: ${({ theme }) => theme.raisedElement_border};
`;

export const borderless = css`
  border: 0;
`;

/*


/////////////////////
// Specific styles //
/////////////////////

.tooltip-popup {
  @include themify($themes) {
    &.place-top {
      &:after {
        border-top-color: themed("raised-high__background-color");
        border-top-style: solid;
        border-top-width: 6px;
      }
    }
  }
}

.breadcrumb__divider {
  @include themify($themes) {
    color: themed("breadcrumb__divider___color");
  }
}
.breadcrumb__section {
  @include themify($themes) {
    color: themed("breadcrumb__section___color");
  }
}
.breadcrumb__section--active {
  @include themify($themes) {
    color: themed("breadcrumb__section--active___color");
  }
}

.pagination__container .pagination a {
  @include themify($themes) {
    color: themed("text__color");
  }
}
.pagination__container .pagination .active {
  @include themify($themes) {
    background-color: themed("selected-color");
  }
}

.react-sweet-progress-line {
  @include themify($themes) {
    background-color: themed("raised-low__background-color");
  }
}
.react-sweet-progress-line-inner {
  @include themify($themes) {
    background-color: themed("selected-color");
  }
}

body ::-webkit-scrollbar {
}
body ::-webkit-scrollbar-track {
  @include themify($themes) {
    background-color: themed("scrollbar__track-color");
  }
}
body ::-webkit-scrollbar-thumb {
  @include themify($themes) {
    background-color: themed("scrollbar__thumb-color");
  }
}

.tabs {
  .tabular.menu {
    border-bottom: 1px solid #5f5f5f;

    .active.item {
      @include themify($themes) {
        background-color: themed("background__color");
        color: themed("text__color");
        border: themed("border");
      }
    }
    .item {
      @include themify($themes) {
        background-color: themed("background__color");
        color: themed("text__color");
        border: none;
      }
    }
  }
  .tab {
    @include themify($themes) {
      background-color: themed("background__color");
      color: themed("text__color");
      border: none;
    }
  }
}

.app-chrome__sidebar_header:hover {
  @include themify($themes) {
    background-color: themed("raised-high__selected-background-color");
  }
}
*/
