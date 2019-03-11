import * as React from "react";
import { useCallback } from "react";

import { useIndexVolumeGroups } from "../../api/indexVolumeGroup";
import IndexVolumeGroupsTable, {
  useTable
} from "./IndexVolumeGroupsTable/IndexVolumeGroupsTable";
import Button from "../../components/Button";
import NewIndexVolumeGroupDialog, {
  useDialog as useNewDialog
} from "./NewIndexVolumeGroupDialog";
import ThemedConfirm, {
  useDialog as useConfirmDialog
} from "../../components/ThemedConfirm";
import IconHeader from "../../components/IconHeader";
import useAppNavigation from "../../AppChrome/useAppNavigation";

const IndexVolumeGroups = () => {
  const { goToIndexVolumeGroup } = useAppNavigation();

  const {
    groups,
    createIndexVolumeGroup,
    deleteIndexVolumeGroup
  } = useIndexVolumeGroups();

  const { componentProps: tableProps } = useTable(groups);
  const {
    selectableTableProps: { selectedItems: selectedGroups }
  } = tableProps;

  const {
    showDialog: showNewDialog,
    componentProps: newDialogComponentProps
  } = useNewDialog(createIndexVolumeGroup);

  const {
    showDialog: showDeleteDialog,
    componentProps: deleteDialogComponentProps
  } = useConfirmDialog({
    getQuestion: useCallback(
      () => `Are you sure you want to delete selected groups?`,
      []
    ),
    getDetails: useCallback(() => selectedGroups.map(v => v.name).join(", "), [
      selectedGroups.map(v => v.name)
    ]),
    onConfirm: useCallback(() => {
      selectedGroups.forEach(g => deleteIndexVolumeGroup(g.name));
    }, [deleteIndexVolumeGroup, selectedGroups.map(v => v.name)])
  });

  const onViewEditClick = useCallback(() => {
    if (selectedGroups.length === 1) {
      goToIndexVolumeGroup(selectedGroups[0].name);
    }
  }, [selectedGroups, goToIndexVolumeGroup]);

  return (
    <div>
      <IconHeader text="Index Volume Groups" icon="database" />

      <Button text="Create" onClick={showNewDialog} />
      <Button
        text="View/Edit"
        disabled={selectedGroups.length !== 1}
        onClick={onViewEditClick}
      />
      <Button
        text="Delete"
        disabled={selectedGroups.length === 0}
        onClick={() => showDeleteDialog()}
      />

      <NewIndexVolumeGroupDialog {...newDialogComponentProps} />

      <ThemedConfirm {...deleteDialogComponentProps} />

      <IndexVolumeGroupsTable {...tableProps} />
    </div>
  );
};

export default IndexVolumeGroups;
