import * as React from "react";
import Select from "react-select";
import {
  SelectOptionType,
  IndexFieldType,
  SelectOptionsType,
  IndexFieldTypeDisplayValues
} from "../../../types";

interface Props {
  className?: string;
  value?: IndexFieldType;
  onChange: (c: IndexFieldType) => any;
}

const OPTIONS: SelectOptionsType = Object.entries(
  IndexFieldTypeDisplayValues
).map(d => ({
  value: d[0],
  label: d[1]
}));

const IndexFieldTypePicker = ({ className, value, onChange }: Props) => (
  <Select
    className={className}
    placeholder="Index Field Type"
    value={OPTIONS.find(o => o.value === value)}
    onChange={(o: SelectOptionType) => onChange(o.value as IndexFieldType)}
    options={OPTIONS}
  />
);

export default IndexFieldTypePicker;
