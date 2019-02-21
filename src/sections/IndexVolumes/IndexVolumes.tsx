import * as React from "react";
import { useEffect, useCallback } from "react";

import useReduxState from "../../lib/useReduxState/useReduxState";
import useApi from "./useIndexVolumeApi";
import IconHeader from "../../components/IconHeader";
import Button from "../../components/Button";
import NewIndexVolumeDialog, {
  useDialog as useCreateNewIndexVolumeDialog
} from "./NewIndexVolumeDialog";
import ThemedConfirm, {
  useDialog as useThemedConfirmDialog
} from "../../components/ThemedConfirm";
import IndexVolumesTable, { useTable } from "./IndexVolumesTable";
import useRouter from "../../lib/useRouter";

export interface Props {}

const IndexVolumes = () => {
  const { history } = useRouter();

  const { indexVolumes } = useReduxState(
    ({ indexVolumes: { indexVolumes } }) => ({
      indexVolumes
    })
  );
  const api = useApi();
  const { componentProps: tableProps } = useTable(indexVolumes);
  const {
    selectableTableProps: { selectedItems }
  } = tableProps;

  useEffect(api.getIndexVolumes, []);

  const {
    showDialog: showCreateNewDialog,
    componentProps: createNewDialogProps
  } = useCreateNewIndexVolumeDialog();

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
      selectedItems.forEach(v => api.deleteIndexVolume(v.id));
    }, [selectedItems.map(v => v.id)])
  });

  return (
    <div>
      <IconHeader text="Index Volumes" icon="database" />

      <Button text="Create" onClick={showCreateNewDialog} />
      <Button
        text="View/Edit"
        disabled={selectedItems.length !== 1}
        onClick={() =>
          history.push(`/s/indexing/volumes/${selectedItems[0].id}`)
        }
      />
      <Button
        text="Delete"
        disabled={selectedItems.length === 0}
        onClick={showDeleteDialog}
      />

      <NewIndexVolumeDialog {...createNewDialogProps} />

      <ThemedConfirm {...deleteDialogProps} />

      <IndexVolumesTable {...tableProps} />
    </div>
  );
};

export default IndexVolumes;
