import * as React from "react";

import IconHeader from "components/IconHeader";
import Button from "components/Button";
import NewIndexVolumeDialog, {
  useDialog as useCreateNewIndexVolumeDialog,
} from "./NewIndexVolumeDialog/NewIndexVolumeDialog";
import ThemedConfirm, {
  useDialog as useThemedConfirmDialog,
} from "components/ThemedConfirm";
import IndexVolumesTable, {
  useTable,
} from "./IndexVolumesTable/IndexVolumesTable";
import {
  IndexVolumeGroupModalPicker,
  useIndexVolumeGroupModalPicker,
} from "../IndexVolumeGroups/IndexVolumeGroupPickerDialog";
import { useIndexVolumes, IndexVolume } from "components/IndexVolumes/api";
import useAppNavigation from "../AppChrome/useAppNavigation";

const IndexVolumes: React.FunctionComponent = () => {
  const { goToIndexVolume } = useAppNavigation();

  const {
    indexVolumes,
    createIndexVolume,
    deleteIndexVolume,
    addVolumeToGroup,
  } = useIndexVolumes();

  const { componentProps: tableProps } = useTable(indexVolumes);
  const {
    selectableTableProps: { selectedItems: selectedIndexVolumes },
  } = tableProps;

  const {
    showDialog: showCreateNewDialog,
    componentProps: createNewDialogProps,
  } = useCreateNewIndexVolumeDialog(createIndexVolume);

  const {
    showDialog: showDeleteDialog,
    componentProps: deleteDialogProps,
  } = useThemedConfirmDialog({
    getQuestion: React.useCallback(
      () => `Are you sure you want to delete selected volumes`,
      [],
    ),
    getDetails: React.useCallback(
      () => selectedIndexVolumes.map((v: IndexVolume) => v.id).join(", "),
      [selectedIndexVolumes],
    ),
    onConfirm: React.useCallback(() => {
      selectedIndexVolumes.forEach((v: IndexVolume) => deleteIndexVolume(v.id));
    }, [selectedIndexVolumes, deleteIndexVolume]),
  });

  const {
    showDialog: showAddToGroupDialog,
    componentProps: addToGroupProps,
  } = useIndexVolumeGroupModalPicker({
    onConfirm: React.useCallback(
      groupName =>
        selectedIndexVolumes
          .map((v: IndexVolume) => v.id)
          .forEach((vId: string) => addVolumeToGroup(vId, groupName)),
      [addVolumeToGroup, selectedIndexVolumes],
    ),
  });

  const onViewClick: React.MouseEventHandler<
    HTMLButtonElement
  > = React.useCallback(() => {
    if (selectedIndexVolumes.length === 1) {
      goToIndexVolume(selectedIndexVolumes[0].id);
    }
  }, [goToIndexVolume, selectedIndexVolumes]);

  return (
    <div className="fill-space">
      <IconHeader text="Index Volumes" icon="database" />

      <Button text="Create" onClick={showCreateNewDialog} />
      <Button
        text="View/Edit"
        disabled={selectedIndexVolumes.length !== 1}
        onClick={onViewClick}
      />
      <Button
        text="Add to Group"
        disabled={selectedIndexVolumes.length === 0}
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
