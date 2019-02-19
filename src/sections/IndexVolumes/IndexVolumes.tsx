import * as React from "react";
import { useState, useEffect } from "react";

import { IndexVolume } from "../../types";

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
import IndexVolumesTable from "./IndexVolumesTable";
import useHistory from "../../lib/useHistory";

export interface Props {}

const IndexVolumes = () => {
  const history = useHistory();

  const { indexVolumes } = useReduxState(
    ({ indexVolumes: { indexVolumes } }) => ({
      indexVolumes
    })
  );
  const api = useApi();

  useEffect(api.getIndexVolumes, []);

  const [selectedIndexVolume, setSelectedIndexVolume] = useState<
    IndexVolume | undefined
  >(undefined);

  const onSelection = (selectedId: number) => {
    setSelectedIndexVolume(
      indexVolumes.find((u: IndexVolume) => u.id === selectedId)
    );
  };

  const {
    showDialog: showCreateNewDialog,
    componentProps: createNewDialogProps
  } = useCreateNewIndexVolumeDialog();

  const {
    showDialog: showDeleteDialog,
    componentProps: deleteDialogProps
  } = useThemedConfirmDialog({
    question: selectedIndexVolume
      ? `Are you sure you want to delete ${selectedIndexVolume.id}`
      : "no group?",
    onConfirm: () => {
      api.deleteIndexVolume(selectedIndexVolume!.id);
    }
  });

  return (
    <div>
      <IconHeader text="Index Volumes" icon="database" />

      <Button text="Create" onClick={showCreateNewDialog} />
      <Button
        text="View/Edit"
        disabled={!selectedIndexVolume}
        onClick={() =>
          history.push(`/s/indexing/volumes/${selectedIndexVolume!.id}`)
        }
      />
      <Button
        text="Delete"
        disabled={!selectedIndexVolume}
        onClick={showDeleteDialog}
      />

      <NewIndexVolumeDialog {...createNewDialogProps} />

      <ThemedConfirm {...deleteDialogProps} />

      <IndexVolumesTable
        {...{ indexVolumes, selectedIndexVolume, onSelection }}
      />
    </div>
  );
};

export default IndexVolumes;
