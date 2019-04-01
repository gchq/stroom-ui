import * as React from "react";
import { useCallback } from "react";

import IconHeader from "../../../components/IconHeader";
import Button from "../../../components/Button";
import useRouter from "src/lib/useRouter";
import { useIndexVolume } from "src/api/indexVolume";
import {
  useTable as useIndexVolumeGroupNamesTable,
  IndexVolumeGroupNamesTable
} from "../../IndexVolumeGroups/IndexVolumeGroupNamesTable";
import {
  useIndexVolumeGroupModalPicker,
  IndexVolumeGroupModalPicker
} from "../../IndexVolumeGroups/IndexVolumeGroupPickerDialog";
import ThemedConfirm, {
  useDialog as useConfirmDialog
} from "../../../components/ThemedConfirm";
import Loader from "../../../components/Loader";

interface Props {
  volumeId: string;
}

const IndexVolumeEditor = ({ volumeId }: Props) => {
  const { history } = useRouter();

  const {
    indexVolume,
    groupNames,
    addToGroup,
    removeFromGroup
  } = useIndexVolume(volumeId);

  const { componentProps: tableProps } = useIndexVolumeGroupNamesTable(
    groupNames
  );

  const {
    selectableTableProps: { selectedItems }
  } = tableProps;

  const {
    showDialog: showRemoveDialog,
    componentProps: removeDialogProps
  } = useConfirmDialog({
    onConfirm: useCallback(() => selectedItems.forEach(removeFromGroup), [
      selectedItems,
      removeFromGroup
    ]),
    getQuestion: useCallback(() => "Remove volume from selected groups?", []),
    getDetails: useCallback(() => selectedItems.join(", "), [selectedItems])
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

      <Button text="Back" onClick={history.goBack} />
      <Button text="Add to Group" onClick={showIndexVolumeGroupPicker} />
      <Button
        text="Remove From Group(s)"
        disabled={selectedItems.length === 0}
        onClick={showRemoveDialog}
      />

      <ThemedConfirm {...removeDialogProps} />

      <h2>Group Memberships</h2>
      <IndexVolumeGroupModalPicker {...indexVolumeGroupPickerProps} />
      <IndexVolumeGroupNamesTable {...tableProps} />
    </div>
  );
};

export default IndexVolumeEditor;
