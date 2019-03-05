import * as React from "react";
import { useEffect, useCallback } from "react";

import IconHeader from "../IconHeader";
import Button from "../Button";
import useRouter from "../../lib/useRouter";
import useIndexVolumeGroupApi from "../../api/indexVolumeGroup";
import {
  useIndexVolumeApi,
  useIndexVolumesTable,
  IndexVolumesTable
} from "../../sections/IndexVolumes";
import ThemedConfirm, {
  useDialog as useConfirmDialog
} from "../../components/ThemedConfirm";
import useReduxState from "../../lib/useReduxState";
import { IndexVolumeGroup } from "../../types";
import Loader from "../Loader";

export interface Props {
  groupName: string;
}

const IndexVolumeGroupEditor = ({ groupName }: Props) => {
  const { history } = useRouter();
  const groupApi = useIndexVolumeGroupApi();
  const volumeApi = useIndexVolumeApi();
  const { indexVolumesByGroup, groups } = useReduxState(
    ({
      indexVolumeGroups: { groups },
      indexVolumes: { indexVolumesByGroup }
    }) => ({
      groups,
      indexVolumesByGroup
    })
  );

  useEffect(() => {
    groupApi.getIndexVolumeGroup(groupName);
    volumeApi.getIndexVolumesInGroup(groupName);
  }, [groupName]);

  const { componentProps: tableProps } = useIndexVolumesTable(
    indexVolumesByGroup[groupName]
  );

  const {
    selectableTableProps: { selectedItems }
  } = tableProps;

  const {
    showDialog: showRemoveDialog,
    componentProps: removeDialogProps
  } = useConfirmDialog({
    onConfirm: () =>
      selectedItems.forEach(v =>
        volumeApi.removeVolumeFromGroup(v.id, groupName)
      ),
    getQuestion: useCallback(() => "Remove selected volumes from group?", []),
    getDetails: useCallback(() => selectedItems.map(s => s.id).join(", "), [
      selectedItems.map(s => s.id)
    ])
  });

  const indexVolumeGroup: IndexVolumeGroup | undefined = groups.find(
    g => g.name === groupName
  );

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
