import * as dateFormat from "dateformat";
import * as React from "react";
import {
  Column,
  ReactTableFunction,
  RowInfo,
  RowRenderProps,
} from "react-table";
import "react-table/react-table.css";
import "react-toggle/style.css";

/** There is a corresponding react-table type but doing it like this is neater. */
interface FilterProps {
  filter: any;
  onChange: ReactTableFunction;
}

const getEnabledCellRenderer = (
  row: RowRenderProps,
  setEnabledStateOnToken: Function,
) => {
  const state = row.original.enabled;
  const tokenId = row.original.id;
  return (
    <div className="TokenSearch__table__checkbox">
      <input
        type="checkbox"
        checked={state}
        onChange={() => setEnabledStateOnToken(tokenId, !state)}
      />
    </div>
  );
};

const getEnabledCellFilter = (filter: any, onChange: Function) => {
  return (
    <select
      onChange={event => onChange(event.target.value)}
      style={{ width: "100%" }}
      value={filter ? filter.value : "all"}
    >
      <option value="">Show all</option>
      <option value="true">Enabled only</option>
      <option value="false">Disabled only</option>
    </select>
  );
};

const formatDate = (dateString: string) => {
  const dateFormatString = "ddd mmm d yyyy, hh:MM:ss";
  return dateString ? dateFormat(dateString, dateFormatString) : "";
};

export const getColumnFormat = (
  selectedTokenRowId: string | undefined,
  setEnabledStateOnToken: Function,
) => {
  return [
    {
      Header: "",
      accessor: "id",
      Cell: (row: RowInfo): React.ReactNode => {
        const selectionDiv = () => (
          <div>
            {selectedTokenRowId === row.row.value ? "selected" : "unselected"}
          </div>
        );
        selectionDiv.displayName = "selectionDiv";
        return selectionDiv;
      },
      filterable: false,
      show: false,
    },
    {
      Header: "User",
      accessor: "userEmail",
      maxWidth: 190,
    },
    {
      Header: "Enabled",
      accessor: "enabled",
      maxWidth: 80,
      Cell: (row: RowInfo) =>
        getEnabledCellRenderer(row, setEnabledStateOnToken),
      Filter: ({ filter, onChange }: FilterProps) =>
        getEnabledCellFilter(filter, onChange),
    },
    {
      Header: "Expires on",
      accessor: "expiresOn",
      Cell: (row: RowInfo) => formatDate(row.row.value),
      filterable: false,
      maxWidth: 165,
    },
    {
      Header: "Issued on",
      accessor: "issuedOn",
      Cell: (row: RowInfo) => formatDate(row.row.value),
      filterable: false,
      maxWidth: 165,
    },
  ] as Column[];
};
