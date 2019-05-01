import * as React from "react";

import { useIndexVolumeGroups } from "components/IndexVolumeGroups/api";
import IndexVolumeGroupsTable, {
  useTable,
} from "./IndexVolumeGroupsTable/IndexVolumeGroupsTable";
import Button from "components/Button";
import NewIndexVolumeGroupDialog, {
  useDialog as useNewDialog,
} from "./NewIndexVolumeGroupDialog";
import ThemedConfirm, {
  useDialog as useConfirmDialog,
} from "components/ThemedConfirm";
import useAppNavigation from "../AppChrome/useAppNavigation";
import Toggle from "react-toggle";
import DocRefIconHeader from "components/DocRefIconHeader";

const IndexVolumeGroups: React.FunctionComponent = () => {
  const [filterable, setFilteringEnabled] = React.useState(false);
  const { goToIndexVolumeGroup } = useAppNavigation();

  const {
    groups,
    createIndexVolumeGroup,
    deleteIndexVolumeGroup,
  } = useIndexVolumeGroups();

  const { componentProps: tableProps } = useTable(groups, { filterable });
  const {
    selectableTableProps: { selectedItems: selectedGroups },
  } = tableProps;

  const {
    showDialog: showNewDialog,
    componentProps: newDialogComponentProps,
  } = useNewDialog(createIndexVolumeGroup);

  const {
    showDialog: showDeleteDialog,
    componentProps: deleteDialogComponentProps,
  } = useConfirmDialog({
    getQuestion: React.useCallback(
      () => `Are you sure you want to delete selected groups?`,
      [],
    ),
    getDetails: React.useCallback(
      () => selectedGroups.map(v => v.name).join(", "),
      [selectedGroups],
    ),
    onConfirm: React.useCallback(() => {
      selectedGroups.forEach(g => deleteIndexVolumeGroup(g.name));
    }, [deleteIndexVolumeGroup, selectedGroups]),
  });

  const onViewEditClick = React.useCallback(() => {
    if (selectedGroups.length === 1) {
      goToIndexVolumeGroup(selectedGroups[0].name);
    }
  }, [selectedGroups, goToIndexVolumeGroup]);

  return (
    <div className="page">
      <div className="page__header">
        <DocRefIconHeader text="Index Volumes Groups" docRefType="Index" />
      </div>
      <div className="page__search" />
      <div className="page__body">
        <IndexVolumeGroupsTable {...tableProps} />
      </div>

      <div className="page__buttons">
        <Button
          className="toolbar-button-small primary"
          onClick={showNewDialog}
          icon="plus"
          text="Create"
        />
        <Button
          className="toolbar-button-small primary"
          disabled={selectedGroups.length !== 1}
          onClick={onViewEditClick}
          icon="edit"
          text="View/edit"
        />
        <Button
          disabled={selectedGroups.length !== 1}
          onClick={showDeleteDialog}
          className="toolbar-button-small primary"
          icon="trash"
          text="Delete"
        />
        <div className="UserSearch-filteringToggle">
          <label>Show filtering</label>
          <Toggle
            icons={false}
            checked={filterable}
            onChange={event => setFilteringEnabled(event.target.checked)}
          />
        </div>
      </div>

      <div className="UserSearch-content">
        <div className="table-small-container">
          <IndexVolumeGroupsTable {...tableProps} />
        </div>
      </div>
      <NewIndexVolumeGroupDialog {...newDialogComponentProps} />
      <ThemedConfirm {...deleteDialogComponentProps} />
    </div>
  );
};

export default IndexVolumeGroups;
