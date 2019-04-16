import * as React from "react";

import IconHeader from "src/components/IconHeader";
import Button from "src/components/Button";
import useRouter from "src/lib/useRouter";
import { useIndexVolume } from "src/components/IndexVolumes/api/indexVolume";
import {
  useTable as useIndexVolumeGroupNamesTable,
  IndexVolumeGroupNamesTable,
} from "../../IndexVolumeGroups/IndexVolumeGroupNamesTable";
import {
  useIndexVolumeGroupModalPicker,
  IndexVolumeGroupModalPicker,
} from "../../IndexVolumeGroups/IndexVolumeGroupPickerDialog";
import ThemedConfirm, {
  useDialog as useConfirmDialog,
} from "src/components/ThemedConfirm";
import Loader from "src/components/Loader";

interface Props {
  volumeId: string;
}

const IndexVolumeEditor: React.FunctionComponent<Props> = ({ volumeId }) => {
  const { history } = useRouter();

  const {
    indexVolume,
    groupNames,
    addToGroup,
    removeFromGroup,
  } = useIndexVolume(volumeId);

  const { componentProps: tableProps } = useIndexVolumeGroupNamesTable(
    groupNames,
  );

  const {
    selectableTableProps: { selectedItems },
  } = tableProps;

  const {
    showDialog: showRemoveDialog,
    componentProps: removeDialogProps,
  } = useConfirmDialog({
    onConfirm: React.useCallback(() => selectedItems.forEach(removeFromGroup), [
      selectedItems,
      removeFromGroup,
    ]),
    getQuestion: React.useCallback(
      () => "Remove volume from selected groups?",
      [],
    ),
    getDetails: React.useCallback(() => selectedItems.join(", "), [
      selectedItems,
    ]),
  });

  const {
    componentProps: indexVolumeGroupPickerProps,
    showDialog: showIndexVolumeGroupPicker,
  } = useIndexVolumeGroupModalPicker({
    onConfirm: React.useCallback((groupName: string) => addToGroup(groupName), [
      volumeId,
      addToGroup,
    ]),
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
