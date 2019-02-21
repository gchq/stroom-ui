import * as React from "react";
import { useEffect, useState, useCallback } from "react";

import IconHeader from "../IconHeader";
import Button, { DialogActionButtons } from "../Button";
import useRouter from "../../lib/useRouter";
import { useIndexVolumeApi } from "../../sections/IndexVolumes";
import {
  useIndexVolumeGroupsTable,
  IndexVolumeGroupsTable,
  IndexVolumeGroupPicker,
  useIndexVolumeGroupPicker
} from "../../sections/IndexVolumeGroups";
import useReduxState from "../../lib/useReduxState";
import ThemedModal from "../ThemedModal";
import ThemedConfirm, {
  useDialog as useConfirmDialog
} from "../../components/ThemedConfirm";
import { IndexVolume } from "../../types";
import Loader from "../Loader";

export interface Props {
  volumeId: string;
}

const IndexVolumeEditor = ({ volumeId }: Props) => {
  const { history } = useRouter();
  const volumeApi = useIndexVolumeApi();
  const { indexVolumes, groupsByIndexVolume } = useReduxState(
    ({ indexVolumes: { indexVolumes, groupsByIndexVolume } }) => ({
      indexVolumes,
      groupsByIndexVolume
    })
  );

  useEffect(() => {
    volumeApi.getGroupsForIndexVolume(volumeId);
  }, [volumeId]);

  const volumeGroupPickerProps = useIndexVolumeGroupPicker();
  const {
    reset: resetVolumeGroup,
    value: volumeGroupName
  } = volumeGroupPickerProps;

  const [addToGroupOpen, setAddToGroupOpen] = useState<boolean>(false);

  const { componentProps: tableProps } = useIndexVolumeGroupsTable(
    groupsByIndexVolume[volumeId]
  );

  const {
    selectableTableProps: { selectedItems }
  } = tableProps;

  const {
    showDialog: showRemoveDialog,
    componentProps: removeDialogProps
  } = useConfirmDialog({
    onConfirm: () =>
      selectedItems.forEach(g =>
        volumeApi.removeVolumeFromGroup(volumeId, g.name)
      ),
    getQuestion: useCallback(() => "Remove volume from selected groups?", []),
    getDetails: useCallback(() => selectedItems.map(s => s.name).join(", "), [
      selectedItems.map(s => s.name)
    ])
  });

  const indexVolume: IndexVolume | undefined = indexVolumes.find(
    v => v.id === volumeId
  );

  if (!indexVolume) {
    return <Loader message={`Loading Index Volume ${volumeId}`} />;
  }

  return (
    <div>
      <IconHeader icon="database" text={`Index Volume - ${indexVolume.id}`} />
      <Button
        text="Back"
        onClick={() => history.push(`/s/indexing/volumes/`)}
      />
      <Button text="Add to Group" onClick={() => setAddToGroupOpen(true)} />
      <Button
        text="Remove From Group(s)"
        disabled={selectedItems.length === 0}
        onClick={showRemoveDialog}
      />

      <ThemedConfirm {...removeDialogProps} />

      <h2>Group Memberships</h2>
      <ThemedModal
        isOpen={addToGroupOpen}
        header={<IconHeader icon="plus" text="Add Volume to Group" />}
        content={<IndexVolumeGroupPicker {...volumeGroupPickerProps} />}
        actions={
          <DialogActionButtons
            onConfirm={() => {
              if (!!volumeGroupName) {
                volumeApi.addVolumeToGroup(volumeId, volumeGroupName);
              }
              setAddToGroupOpen(false);
            }}
            onCancel={() => {
              resetVolumeGroup();
              setAddToGroupOpen(false);
            }}
          />
        }
      />
      <IndexVolumeGroupsTable {...tableProps} />
    </div>
  );
};

export default IndexVolumeEditor;
