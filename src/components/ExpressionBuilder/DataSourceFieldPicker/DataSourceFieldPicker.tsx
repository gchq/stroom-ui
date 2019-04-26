import * as React from "react";
import { DataSourceType } from "../types";
import Select from "react-select";
import { ValueType } from "react-select/lib/types";
import useReactSelect from "lib/useReactSelect";

interface Props {
  dataSource: DataSourceType;
  value: string | undefined;
  onChange: (e: string) => void;
}

interface MyOption {
  value: string;
  label: string;
}

const DataSourceFieldPicker: React.FunctionComponent<Props> = ({
  dataSource,
  value,
  onChange,
}) => {
  const options: string[] = React.useMemo(
    () => dataSource.fields.map(({ name }) => name),
    [dataSource],
  );
  const { _options, _onChange, _value } = useReactSelect({
    options,
    onChange,
    value,
  });

  return (
    <Select
      placeholder="Field"
      options={_options}
      value={_value}
      onChange={_onChange}
    />
  );
};

export default DataSourceFieldPicker;
