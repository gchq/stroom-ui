import * as React from "react";
import Select, { components } from "react-select";
import { Props } from "./types";
import useDocumentSearch from "src/api/explorer/useDocumentSearch";
import {
  DocRefType,
  DocRefTree,
  DocRefWithLineage,
} from "src/api/useDocumentApi/types/base";
import { OptionProps } from "react-select/lib/components/Option";
import DocRefImage from "../DocRefImage";
import { SingleValueProps } from "react-select/lib/components/SingleValue";
import ModeOptionButtons, { SearchMode } from "./ModeOptionButton";
import { useModeOptionButtons } from "./ModeOptionButton/ModeOptionButtons";
import { ContainerProps } from "react-select/lib/components/containers";
import { filterTree, findItem } from "src/lib/treeUtils";
import useRecentItems from "src/lib/useRecentItems";

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
  typeFilters = [],
  onChange,
  value,
}) => {
  const { documentTree, searchResults, searchApp } = useDocumentSearch();
  const { recentItems } = useRecentItems();
  const {
    searchMode,
    componentProps: modeOptionProps,
  } = useModeOptionButtons();
  const { switchMode } = modeOptionProps;
  let [navFolder, setNavFolder] = React.useState<DocRefType | undefined>(
    undefined,
  );

  const onSearchTermChange = React.useCallback(
    (newValue: string) => {
      switchMode(
        newValue.length > 0 ? SearchMode.GLOBAL_SEARCH : SearchMode.NAVIGATION,
      );
      searchApp({ term: newValue });
    },
    [searchApp],
  );

  const onThisChange = React.useCallback(
    (docRef: DocRefType) => {
      if (docRef.type === "Folder") {
        if (
          !typeFilters ||
          typeFilters.length === 0 ||
          typeFilters.includes("Folder")
        ) {
          onChange(docRef);
        } else {
          setNavFolder(docRef);
        }
      } else {
        onChange(docRef);
      }
    },
    [typeFilters],
  );

  const documentTreeToUse: DocRefTree =
    typeFilters.length > 0
      ? filterTree(documentTree, d => typeFilters.includes(d.type))!
      : documentTree;

  let docRefs: DocRefType[] = [];
  let thisFolder: DocRefTree | undefined = undefined;
  let parentFolder: DocRefType | undefined = undefined;
  let valueToShow = "NONE";

  switch (searchMode) {
    case SearchMode.NAVIGATION: {
      const navFolderToUse = navFolder || documentTreeToUse;
      if (!!navFolderToUse) {
        const navFolderWithLineage: DocRefWithLineage = findItem(
          documentTreeToUse,
          navFolderToUse.uuid,
        )!;
        docRefs = navFolderWithLineage.node.children || [];
        thisFolder = navFolderWithLineage.node;

        if (
          navFolderWithLineage.lineage &&
          navFolderWithLineage.lineage.length > 0
        ) {
          parentFolder =
            navFolderWithLineage.lineage[
              navFolderWithLineage.lineage.length - 1
            ];
        }
      }
      break;
    }
    case SearchMode.GLOBAL_SEARCH: {
      docRefs = searchResults;
      break;
    }
    case SearchMode.RECENT_ITEMS: {
      docRefs = recentItems;
      break;
    }
    default:
      docRefs = [];
      break;
  }

  console.log("Stuff", {
    thisFolder,
    parentFolder,
    valueToShow,
  });

  return (
    <Select
      modeOptionProps={modeOptionProps} // passed through
      options={docRefs}
      value={value}
      onChange={onThisChange}
      components={{ SingleValue, Option, SelectContainer }}
      onInputChange={onSearchTermChange}
      getOptionValue={getDocRefValue}
      getOptionLabel={getDocRefLabel}
    />
  );
};

export default AppSelectBar;
