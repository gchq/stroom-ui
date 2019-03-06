import * as React from "react";
import { useCallback } from "react";

import IconHeader from "../../../components/IconHeader";
import Button from "../../../components/Button";
import useRouter from "../../../lib/useRouter";
import { useIndexVolume } from "../../../api/indexVolume";
import {
  useTable as useIndexVolumeGroupsTable,
  IndexVolumeGroupsTable
} from "../../IndexVolumeGroups/IndexVolumeGroupsTable";
import {
  useIndexVolumeGroupModalPicker,
  IndexVolumeGroupModalPicker
} from "../../IndexVolumeGroups/IndexVolumeGroupPicker";
import ThemedConfirm, {
  useDialog as useConfirmDialog
} from "../../../components/ThemedConfirm";
import Loader from "../../../components/Loader";

export interface Props {
  volumeId: string;
}

const IndexVolumeEditor = ({ volumeId }: Props) => {
  const { history } = useRouter();

  const { indexVolume, groups, addToGroup, removeFromGroup } = useIndexVolume(
    volumeId
  );

  const { componentProps: tableProps } = useIndexVolumeGroupsTable(groups);

  const {
    selectableTableProps: { selectedItems }
  } = tableProps;

  const {
    showDialog: showRemoveDialog,
    componentProps: removeDialogProps
  } = useConfirmDialog({
    onConfirm: useCallback(
      () => selectedItems.forEach(g => removeFromGroup(g.name)),
      [selectedItems, removeFromGroup]
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
    onConfirm: useCallback((groupName: string) => addToGroup(groupName), [
      volumeId,
      addToGroup
    ])
  });

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
