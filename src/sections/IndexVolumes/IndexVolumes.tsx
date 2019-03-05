import * as React from "react";
import { useEffect, useCallback } from "react";

import useReduxState from "../../lib/useReduxState/useReduxState";
import useApi from "../../api/indexVolume/useApi";
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
} from "../../components/IndexVolumeGroupPicker";
import useRouter from "../../lib/useRouter";

export interface Props {}

const IndexVolumes = () => {
  const { history } = useRouter();

  const indexVolumes = useReduxState(
    ({ indexVolumes: { indexVolumes } }) => indexVolumes
  );
  const {
    getIndexVolumes,
    deleteIndexVolume,
    addVolumeToGroup,
    createIndexVolume
  } = useApi();
  const { componentProps: tableProps } = useTable(indexVolumes);
  const {
    selectableTableProps: { selectedItems }
  } = tableProps;

  useEffect(getIndexVolumes, []);

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
    onConfirm: groupName =>
      selectedItems
        .map(v => v.id)
        .forEach(vId => addVolumeToGroup(vId, groupName))
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
