import * as React from "react";
import { useCallback } from "react";

import IconHeader from "../../../components/IconHeader";
import Button from "../../../components/Button";
import useRouter from "../../../lib/useRouter";
import { useIndexVolumeGroup } from "../../../api/indexVolumeGroup";
import { useIndexVolumesTable, IndexVolumesTable } from "../../IndexVolumes";
import ThemedConfirm, {
  useDialog as useConfirmDialog
} from "../../../components/ThemedConfirm";
import Loader from "../../../components/Loader";

 interface Props {
  groupName: string;
}

const IndexVolumeGroupEditor = ({ groupName }: Props) => {
  const { history } = useRouter();

  const { indexVolumes, indexVolumeGroup, removeVolume } = useIndexVolumeGroup(
    groupName
  );

  const { componentProps: tableProps } = useIndexVolumesTable(indexVolumes);

  const {
    selectableTableProps: { selectedItems }
  } = tableProps;

  const {
    showDialog: showRemoveDialog,
    componentProps: removeDialogProps
  } = useConfirmDialog({
    onConfirm: () => selectedItems.forEach(v => removeVolume(v.id)),
    getQuestion: useCallback(() => "Remove selected volumes from group?", []),
    getDetails: useCallback(() => selectedItems.map(s => s.id).join(", "), [
      selectedItems.map(s => s.id)
    ])
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
      <Button text="Back" onClick={() => history.push(`/s/indexing/groups/`)} />
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
