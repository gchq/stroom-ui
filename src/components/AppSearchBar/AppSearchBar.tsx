import * as React from "react";
import Select, { components } from "react-select";
import useDocumentSearch from "components/DocumentEditors/api/explorer/useDocumentSearch";
import {
  DocRefType,
  DocRefTree,
  DocRefWithLineage,
} from "components/DocumentEditors/useDocumentApi/types/base";
import { OptionProps } from "react-select/lib/components/Option";
import DocRefImage from "../DocRefImage";
import { SingleValueProps } from "react-select/lib/components/SingleValue";
import ModeOptionButtons, { SearchMode } from "./ModeOptionButton";
import { useModeOptionButtons } from "./ModeOptionButton/ModeOptionButtons";
import { filterTree, findItem } from "lib/treeUtils/treeUtils";
import useRecentItems from "lib/useRecentItems";
import { KeyboardEventHandler } from "react-select/lib/types";
import { MenuProps } from "react-select/lib/components/Menu";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DocRefBreadcrumb from "components/DocRefBreadcrumb";

export interface Props {
  typeFilters?: string[];
  onChange: (d: DocRefType) => any;
  value?: DocRefType;
  className?: string;
}

const getDocRefValue = (d: DocRefType) => d.uuid;
const getDocRefLabel = (d: DocRefType) => d.name || `${d.type} - ${d.uuid}`;

const SingleValue: React.FunctionComponent<SingleValueProps<DocRefType>> = ({
  children,
  data: { type },
}) => (
  <div>
    <DocRefImage
      className="DocRefTypePicker--image"
      size="sm"
      docRefType={type}
    />
    {children}
  </div>
);

const Option: React.FunctionComponent<OptionProps<DocRefType>> = (
  props: OptionProps<DocRefType>,
) => {
  const { onOptionFocus, provideBreadcrumbs } = props.selectProps;

  // We are using the change to isFocused to true to detect 'onFocus'
  React.useEffect(() => {
    if (props.isFocused) {
      onOptionFocus(props.data);
    }
  }, [props.isFocused, props.data, onOptionFocus]);
  return (
    <components.Option {...props}>
      <DocRefImage
        className="DocRefTypePicker--image"
        size="sm"
        docRefType={props.data.type}
      />
      {props.children}
      {provideBreadcrumbs && (
        <DocRefBreadcrumb
          docRefUuid={props.data.uuid}
          openDocRef={onOptionFocus}
        />
      )}
    </components.Option>
  );
};

const DropdownIndicator: React.FunctionComponent<any> = props => {
  return <ModeOptionButtons {...props.selectProps.modeOptionProps} />;
};

const Menu: React.FunctionComponent<MenuProps<DocRefType>> = props => {
  const { headerIcon, headerTitle } = props.selectProps;
  return (
    <React.Fragment>
      <components.Menu {...props}>
        <React.Fragment>
          <div className="app-search-header">
            <div>
              <FontAwesomeIcon icon={headerIcon} size="lg" />
            </div>
            <div className="app-search-header__text">{headerTitle}</div>
          </div>
          {props.children}
        </React.Fragment>
      </components.Menu>
    </React.Fragment>
  );
};

const AppSearchBar: React.FunctionComponent<Props> = ({
  typeFilters = [],
  onChange,
  value,
  className,
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const { documentTree, searchResults, searchApp } = useDocumentSearch();
  const [focussedDocRef, onOptionFocus] = React.useState<
    DocRefType | undefined
  >(undefined);
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
      setSearchTerm(newValue);
    },
    [searchApp, switchMode, setSearchTerm],
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
    [typeFilters, onChange, setNavFolder],
  );

  const documentTreeToUse: DocRefTree = React.useMemo(() => {
    return typeFilters.length > 0
      ? filterTree(documentTree, d => typeFilters.includes(d.type))!
      : documentTree;
  }, [typeFilters, documentTree]);
  const navFolderToUse = navFolder || documentTreeToUse;
  let docRefs: DocRefType[] = [];
  let parentFolder: DocRefType | undefined = undefined;
  let provideBreadcrumbs = searchMode !== SearchMode.NAVIGATION;

  switch (searchMode) {
    case SearchMode.NAVIGATION: {
      if (!!navFolderToUse) {
        const navFolderWithLineage: DocRefWithLineage = findItem(
          documentTreeToUse,
          navFolderToUse.uuid,
        )!;
        docRefs = navFolderWithLineage.node.children || [];

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

  let headerTitle: string | React.ReactElement = "unknown";
  let headerIcon: IconProp = "cross";

  switch (searchMode) {
    case SearchMode.NAVIGATION: {
      headerTitle = !!navFolderToUse && (
        <DocRefBreadcrumb
          docRefUuid={navFolderToUse.uuid}
          openDocRef={onOptionFocus}
        />
      );
      if (!!parentFolder) {
        headerIcon = "arrow-left";
      } else {
        headerIcon = "folder";
      }
      break;
    }
    case SearchMode.GLOBAL_SEARCH: {
      headerIcon = "search";
      headerTitle = `Search for '${searchTerm}'`;
      break;
    }
    case SearchMode.RECENT_ITEMS: {
      headerTitle = "Recent Items";
      headerIcon = "history";
      break;
    }
    default:
      break;
  }

  const onKeyDown: KeyboardEventHandler = React.useCallback(
    e => {
      if (e.key === "ArrowRight" || e.key === "l") {
        if (!!focussedDocRef && focussedDocRef.type === "Folder") {
          setNavFolder(focussedDocRef);
        }
      } else if (e.key === "ArrowLeft" || e.key === "h") {
        if (!!parentFolder) {
          setNavFolder(parentFolder);
        }
      }
    },
    [setNavFolder, parentFolder, focussedDocRef],
  );

  return (
    <Select
      className={className}
      classNamePrefix={className}
      {...{
        onOptionFocus,
        modeOptionProps,
        headerTitle,
        headerIcon,
        provideBreadcrumbs,
      }} // passed through as selectProps
      onKeyDown={onKeyDown}
      options={docRefs}
      value={value}
      onChange={onThisChange}
      components={{ Menu, DropdownIndicator, SingleValue, Option }}
      onInputChange={onSearchTermChange}
      getOptionValue={getDocRefValue}
      getOptionLabel={getDocRefLabel}
    />
  );
};

export default AppSearchBar;
