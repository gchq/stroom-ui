import * as React from "react";
import { useEffect, useCallback } from "react";

import IconHeader from "../IconHeader";
import Button from "../Button";
import useRouter from "../../lib/useRouter";
import { useIndexVolumeApi } from "../../sections/IndexVolumes";
import {
  useTable as useIndexVolumeGroupsTable,
  IndexVolumeGroupsTable
} from "../../sections/IndexVolumeGroups/IndexVolumeGroupsTable";
import {
  useIndexVolumeGroupModalPicker,
  IndexVolumeGroupModalPicker
} from "../IndexVolumeGroupPicker";
import useReduxState from "../../lib/useReduxState";
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

  const {
    componentProps: indexVolumeGroupPickerProps,
    showDialog: showIndexVolumeGroupPicker
  } = useIndexVolumeGroupModalPicker({
    onConfirm: useCallback(
      (groupName: string) => volumeApi.addVolumeToGroup(volumeId, groupName),
      [volumeId]
    )
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
      <Button text="Add to Group" onClick={showIndexVolumeGroupPicker} />
      <Button
        text="Remove From Group(s)"
        disabled={selectedItems.length === 0}
        onClick={showRemoveDialog}
      />

      <ThemedConfirm {...removeDialogProps} />

      <h2>Group Memberships</h2>
      <IndexVolumeGroupModalPicker {...indexVolumeGroupPickerProps} />
      <IndexVolumeGroupsTable {...tableProps} />
    </div>
  );
};

export default IndexVolumeEditor;
