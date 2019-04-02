import * as React from "react";
import { useCallback } from "react";

import IconHeader from "src/components/IconHeader";
import Button from "src/components/Button";
import useRouter from "src/lib/useRouter";
import { useIndexVolumeGroup } from "src/api/indexVolumeGroup";
import {
  useTable as useIndexVolumesTable,
  IndexVolumesTable,
} from "../../IndexVolumes/IndexVolumesTable";
import ThemedConfirm, {
  useDialog as useConfirmDialog,
} from "src/components/ThemedConfirm";
import Loader from "src/components/Loader";

interface Props {
  groupName: string;
}

const IndexVolumeGroupEditor = ({ groupName }: Props) => {
  const { history } = useRouter();

  const { indexVolumes, indexVolumeGroup, removeVolume } = useIndexVolumeGroup(
    groupName,
  );

  const { componentProps: tableProps } = useIndexVolumesTable(indexVolumes);

  const {
    selectableTableProps: { selectedItems },
  } = tableProps;

  const {
    showDialog: showRemoveDialog,
    componentProps: removeDialogProps,
  } = useConfirmDialog({
    onConfirm: () => selectedItems.forEach(v => removeVolume(v.id)),
    getQuestion: useCallback(() => "Remove selected volumes from group?", []),
    getDetails: useCallback(() => selectedItems.map(s => s.id).join(", "), [
      selectedItems.map(s => s.id),
    ]),
  });

  if (!indexVolumeGroup) {
    return <Loader message={`Loading Index Volume Group ${groupName}`} />;
  }

  return (
    <div>
      <IconHeader
        icon="database"
        text={`Index Volume Group - ${indexVolumeGroup.name}`}
      />
      <Button text="Back" onClick={history.goBack} />
      <Button
        text="Remove From Group"
        disabled={selectedItems.length === 0}
        onClick={showRemoveDialog}
      />

      <ThemedConfirm {...removeDialogProps} />

      <h2>Volumes</h2>
      <IndexVolumesTable {...tableProps} />
    </div>
  );
};

export default IndexVolumeGroupEditor;
