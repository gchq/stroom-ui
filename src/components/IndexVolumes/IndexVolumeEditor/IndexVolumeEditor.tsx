import * as React from "react";

import IconHeader from "components/IconHeader";
import Button from "components/Button";
import useRouter from "lib/useRouter";
import { useIndexVolume } from "components/IndexVolumes/api";
import {
  useTable as useIndexVolumeGroupTable,
  IndexVolumeGroupNamesTable,
} from "../../IndexVolumeGroups/IndexVolumeGroupNamesTable";
import {
  useIndexVolumeGroupModalPicker,
  IndexVolumeGroupModalPicker,
} from "../../IndexVolumeGroups/IndexVolumeGroupPickerDialog";
import ThemedConfirm, {
  useDialog as useConfirmDialog,
} from "components/ThemedConfirm";
import Loader from "components/Loader";
import { ButtonAppearance } from "components/Button/types";

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

  const { componentProps: tableProps } = useIndexVolumeGroupTable(groupNames);

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
      addToGroup,
    ]),
  });

  if (!indexVolume) {
    return <Loader message={`Loading Index Volume ${volumeId}`} />;
  }

  return (
    <div>
      <IconHeader icon="database" text={`Index Volume - ${indexVolume.id}`} />

      <Button
        appearance={ButtonAppearance.Text}
        text="Back"
        onClick={history.goBack}
      />
      <Button
        appearance={ButtonAppearance.Text}
        text="Add to Group"
        onClick={showIndexVolumeGroupPicker}
      />
      <Button
        appearance={ButtonAppearance.Text}
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
