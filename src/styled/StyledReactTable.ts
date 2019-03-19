import styled from "styled-components";
import ReactTable from "react-table";

export const StyledReactTable = styled(ReactTable)`
  width: 100%;

  & .rt-tbody .rt-tr-group {
    max-height: 23px;
  }

  & .rt-th,
  & .rt-td {
    padding: 2px 2px;
  }

  & .rt-thead.-header {
    box-shadow: none;
    border-bottom: solid 1px lightgrey;
  }
`;
