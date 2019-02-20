import * as React from "react";
import { useEffect } from "react";

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

  useEffect(api.getIndexVolumes, []);

  const {
    showDialog: showCreateNewDialog,
    componentProps: createNewDialogProps
  } = useCreateNewIndexVolumeDialog();

  const {
    showDialog: showDeleteDialog,
    componentProps: deleteDialogProps
  } = useThemedConfirmDialog({
    question: tableProps.selectedIndexVolume
      ? `Are you sure you want to delete ${tableProps.selectedIndexVolume.id}`
      : "no group?",
    onConfirm: () => {
      api.deleteIndexVolume(tableProps.selectedIndexVolume!.id);
    }
  });

  return (
    <div>
      <IconHeader text="Index Volumes" icon="database" />

      <Button text="Create" onClick={showCreateNewDialog} />
      <Button
        text="View/Edit"
        disabled={!tableProps.selectedIndexVolume}
        onClick={() =>
          history.push(
            `/s/indexing/volumes/${tableProps.selectedIndexVolume!.id}`
          )
        }
      />
      <Button
        text="Delete"
        disabled={!tableProps.selectedIndexVolume}
        onClick={showDeleteDialog}
      />

      <NewIndexVolumeDialog {...createNewDialogProps} />

      <ThemedConfirm {...deleteDialogProps} />

      <IndexVolumesTable {...tableProps} />
    </div>
  );
};

export default IndexVolumes;
