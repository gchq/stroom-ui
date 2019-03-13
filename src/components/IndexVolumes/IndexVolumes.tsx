import * as React from "react";
import { useCallback } from "react";

import IconHeader from "../../components/IconHeader";
import Button from "../../components/Button";
import NewIndexVolumeDialog, {
  useDialog as useCreateNewIndexVolumeDialog
} from "./NewIndexVolumeDialog/NewIndexVolumeDialog";
import ThemedConfirm, {
  useDialog as useThemedConfirmDialog
} from "../../components/ThemedConfirm";
import IndexVolumesTable, {
  useTable
} from "./IndexVolumesTable/IndexVolumesTable";
import {
  IndexVolumeGroupModalPicker,
  useIndexVolumeGroupModalPicker
} from "../IndexVolumeGroups/IndexVolumeGroupPickerDialog";
import { useIndexVolumes } from "../../api/indexVolume";
import useAppNavigation from "../AppChrome/useAppNavigation";

const IndexVolumes = () => {
  const { goToIndexVolume } = useAppNavigation();

  const {
    indexVolumes,
    createIndexVolume,
    deleteIndexVolume,
    addVolumeToGroup
  } = useIndexVolumes();

  const { componentProps: tableProps } = useTable(indexVolumes);
  const {
    selectableTableProps: { selectedItems: selectedIndexVolumes }
  } = tableProps;

  const {
    showDialog: showCreateNewDialog,
    componentProps: createNewDialogProps
  } = useCreateNewIndexVolumeDialog(createIndexVolume);

  const {
    showDialog: showDeleteDialog,
    componentProps: deleteDialogProps
  } = useThemedConfirmDialog({
    getQuestion: useCallback(
      () => `Are you sure you want to delete selected volumes`,
      []
    ),
    getDetails: useCallback(
      () => selectedIndexVolumes.map(v => v.id).join(", "),
      [selectedIndexVolumes.map(v => v.id)]
    ),
    onConfirm: useCallback(() => {
      selectedIndexVolumes.forEach(v => deleteIndexVolume(v.id));
    }, [selectedIndexVolumes.map(v => v.id)])
  });

  const {
    showDialog: showAddToGroupDialog,
    componentProps: addToGroupProps
  } = useIndexVolumeGroupModalPicker({
    onConfirm: useCallback(
      groupName =>
        selectedIndexVolumes
          .map(v => v.id)
          .forEach(vId => addVolumeToGroup(vId, groupName)),
      [addVolumeToGroup, selectedIndexVolumes]
    )
  });

  const onViewClick: React.MouseEventHandler<
    HTMLButtonElement
  > = useCallback(() => {
    if (selectedIndexVolumes.length === 1) {
      goToIndexVolume(selectedIndexVolumes[0].id);
    }
  }, [goToIndexVolume, selectedIndexVolumes]);

  return (
    <div>
      <IconHeader text="Index Volumes" icon="database" />

      <Button text="Create" onClick={showCreateNewDialog} />
      <Button
        text="View/Edit"
        disabled={selectedIndexVolumes.length !== 1}
        onClick={onViewClick}
      />
      <Button
        text="Add to Group"
        disabled={selectedIndexVolumes.length == 0}
        onClick={showAddToGroupDialog}
      />
      <Button
        text="Delete"
        disabled={selectedIndexVolumes.length === 0}
        onClick={showDeleteDialog}
      />

      <IndexVolumeGroupModalPicker {...addToGroupProps} />
      <NewIndexVolumeDialog {...createNewDialogProps} />
      <ThemedConfirm {...deleteDialogProps} />
      <IndexVolumesTable {...tableProps} />
    </div>
  );
};

export default IndexVolumes;
