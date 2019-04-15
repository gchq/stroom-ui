import * as React from "react";
import Select from "react-select";
import { SelectOptionType, SelectOptionsType } from "src/types";
import {
  IndexFieldType,
  IndexFieldTypeDisplayValues,
} from "src/api/useDocumentApi/types/indexDoc";

interface Props {
  className?: string;
  value?: IndexFieldType;
  onChange: (c: IndexFieldType) => any;
}

const OPTIONS: SelectOptionsType = Object.entries(
  IndexFieldTypeDisplayValues,
).map(d => ({
  value: d[0],
  label: d[1],
}));

const IndexFieldTypePicker: React.FunctionComponent<Props> = ({
  className,
  value,
  onChange,
}) => (
  <Select
    className={className}
    placeholder="Index Field Type"
    value={OPTIONS.find(o => o.value === value)}
    onChange={(o: SelectOptionType) => onChange(o.value as IndexFieldType)}
    options={OPTIONS}
  />
);

export default IndexFieldTypePicker;
