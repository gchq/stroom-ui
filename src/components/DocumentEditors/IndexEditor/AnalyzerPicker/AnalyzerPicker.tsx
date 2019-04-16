import * as React from "react";
import Select from "react-select";
import { SelectOptionType, SelectOptionsType } from "src/types";
import {
  AnalyzerDisplayValues,
  AnalyzerType,
} from "src/components/DocumentEditors/useDocumentApi/types/indexDoc";

interface Props {
  className?: string;
  value?: AnalyzerType;
  onChange: (c: AnalyzerType) => any;
}

const OPTIONS: SelectOptionsType = Object.entries(AnalyzerDisplayValues).map(
  d => ({
    value: d[0],
    label: d[1],
  }),
);

const AnalyzerPicker: React.FunctionComponent<Props> = ({
  className,
  value,
  onChange,
}) => (
  <Select
    className={className}
    placeholder="Index Field Type"
    value={OPTIONS.find(o => o.value === value)}
    onChange={(o: SelectOptionType) => onChange(o.value as AnalyzerType)}
    options={OPTIONS}
  />
);

export default AnalyzerPicker;
