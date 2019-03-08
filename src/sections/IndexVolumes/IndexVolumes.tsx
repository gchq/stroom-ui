import * as React from "react";
import { useCallback } from "react";

import IconHeader from "../../components/IconHeader";
import Button from "../../components/Button";
import NewIndexVolumeDialog, {
  useDialog as useCreateNewIndexVolumeDialog
} from "./NewIndexVolumeDialog";
import ThemedConfirm, {
  useDialog as useThemedConfirmDialog
} from "../../components/ThemedConfirm";
import IndexVolumesTable, { useTable } from "./IndexVolumesTable";
import {
  IndexVolumeGroupModalPicker,
  useIndexVolumeGroupModalPicker
} from "../IndexVolumeGroups/IndexVolumeGroupPicker";
import useRouter from "../../lib/useRouter";
import { useIndexVolumes } from "../../api/indexVolume";

const IndexVolumes = () => {
  const { history } = useRouter();

  const {
    indexVolumes,
    createIndexVolume,
    deleteIndexVolume,
    addVolumeToGroup
  } = useIndexVolumes();

  const { componentProps: tableProps } = useTable(indexVolumes);
  const {
    selectableTableProps: { selectedItems }
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
    getDetails: useCallback(() => selectedItems.map(v => v.id).join(", "), [
      selectedItems.map(v => v.id)
    ]),
    onConfirm: useCallback(() => {
      selectedItems.forEach(v => deleteIndexVolume(v.id));
    }, [selectedItems.map(v => v.id)])
  });

  const {
    showDialog: showAddToGroupDialog,
    componentProps: addToGroupProps
  } = useIndexVolumeGroupModalPicker({
    onConfirm: useCallback(
      groupName =>
        selectedItems
          .map(v => v.id)
          .forEach(vId => addVolumeToGroup(vId, groupName)),
      [addVolumeToGroup, selectedItems]
    )
  });

  const onViewClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    () => history.push(`/s/indexing/volumes/${selectedItems[0].id}`),
    [history, selectedItems]
  );

  return (
    <div>
      <IconHeader text="Index Volumes" icon="database" />

      <Button text="Create" onClick={showCreateNewDialog} />
      <Button
        text="View/Edit"
        disabled={selectedItems.length !== 1}
        onClick={onViewClick}
      />
      <Button
        text="Add to Group"
        disabled={selectedItems.length == 0}
        onClick={showAddToGroupDialog}
      />
      <Button
        text="Delete"
        disabled={selectedItems.length === 0}
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
