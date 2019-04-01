import * as React from "react";
import Select from "react-select";
import {
  SelectOptionType,
  AnalyzerType,
  SelectOptionsType,
  AnalyzerDisplayValues
} from "src/types";

interface Props {
  className?: string;
  value?: AnalyzerType;
  onChange: (c: AnalyzerType) => any;
}

const OPTIONS: SelectOptionsType = Object.entries(AnalyzerDisplayValues).map(
  d => ({
    value: d[0],
    label: d[1]
  })
);

const AnalyzerPicker = ({ className, value, onChange }: Props) => (
  <Select
    className={className}
    placeholder="Index Field Type"
    value={OPTIONS.find(o => o.value === value)}
    onChange={(o: SelectOptionType) => onChange(o.value as AnalyzerType)}
    options={OPTIONS}
  />
);

export default AnalyzerPicker;
