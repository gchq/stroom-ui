import * as React from "react";
import { DataSourceType } from "../types";
import Select from "react-select";

interface Props {
  dataSource: DataSourceType;
  value: string | undefined;
  onChange: (e: string) => void;
}

interface DataSourceFieldOption {
  value: string;
  label: string;
}

const DataSourceFieldPicker: React.FunctionComponent<Props> = ({
  dataSource,
  value,
  onChange,
}) => {
  const options: DataSourceFieldOption[] = React.useMemo(
    () =>
      dataSource.fields.map(({ name }) => ({
        value: name,
        label: name,
      })),
    [dataSource],
  );

  return (
    <Select
      placeholder="Field"
      options={options}
      value={options.find(o => o.value === value)}
      onChange={(o: DataSourceFieldOption) => onChange(o.value)}
    />
  );
};

export default DataSourceFieldPicker;
