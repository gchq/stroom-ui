import * as React from "react";
import Select, { components } from "react-select";
import { Props } from "./types";
import useDocumentSearch from "src/api/explorer/useDocumentSearch";
import { DocRefType } from "src/api/useDocumentApi/types/base";
import { OptionProps } from "react-select/lib/components/Option";
import DocRefImage from "../DocRefImage";
import { SingleValueProps } from "react-select/lib/components/SingleValue";
import ModeOptionButtons from "./ModeOptionButton";
import { useModeOptionButtons } from "./ModeOptionButton/ModeOptionButtons";
import { ContainerProps } from "react-select/lib/components/containers";

const getDocRefValue = (d: DocRefType) => d.uuid;
const getDocRefLabel = (d: DocRefType) => d.name || `${d.type} - ${d.uuid}`;

const SingleValue: React.FunctionComponent<SingleValueProps<DocRefType>> = ({
  children,
  ...props
}) => (
  <div>
    <DocRefImage
      className="DocRefTypePicker--image"
      size="sm"
      docRefType={props.data.type}
    />
    {children}
  </div>
);

const Option: React.FunctionComponent<OptionProps<DocRefType>> = (
  props: OptionProps<DocRefType>,
) => (
  <components.Option {...props}>
    <DocRefImage
      className="DocRefTypePicker--image"
      size="sm"
      docRefType={props.data.type}
    />
    {props.children}
  </components.Option>
);

const SelectContainer: React.FunctionComponent<ContainerProps<DocRefType>> = ({
  children,
  ...props
}) => {
  return (
    <React.Fragment>
      <ModeOptionButtons {...props.selectProps.modeOptionProps} />
      <components.SelectContainer {...props}>
        {children}
      </components.SelectContainer>
    </React.Fragment>
  );
};

const AppSelectBar: React.FunctionComponent<Props> = ({
  // typeFilters = [],
  onChange,
  value,
}) => {
  const { searchResults, searchApp } = useDocumentSearch();
  const { componentProps: modeOptionProps } = useModeOptionButtons();

  const onSearchTermChange = React.useCallback(
    (newValue: string) => {
      searchApp({ term: newValue });
    },
    [searchApp],
  );

  return (
    <Select
      modeOptionProps={modeOptionProps} // passed through
      options={searchResults}
      value={value}
      onChange={onChange}
      components={{ SingleValue, Option, SelectContainer }}
      onInputChange={onSearchTermChange}
      getOptionValue={getDocRefValue}
      getOptionLabel={getDocRefLabel}
    />
  );
};

export default AppSelectBar;
