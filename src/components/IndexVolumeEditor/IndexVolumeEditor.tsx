import * as React from "react";
import { useEffect, useMemo, useState } from "react";

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
import { IndexVolumeGroup } from "../../types";
import ThemedModal from "../ThemedModal";

export interface Props {
  id: string;
}

const IndexVolumeEditor = ({ id }: Props) => {
  const { history } = useRouter();
  const volumeApi = useIndexVolumeApi();
  const { indexVolumeGroupMemberships, groups } = useReduxState(
    ({
      indexVolumeGroups: { groups },
      indexVolumes: { indexVolumeGroupMemberships }
    }) => ({
      indexVolumeGroupMemberships,
      groups
    })
  );

  useEffect(() => {
    volumeApi.getGroupsForIndexVolume(id);
  }, [id]);

  const volumeGroupPickerProps = useIndexVolumeGroupPicker();
  const {
    reset: resetVolumeGroup,
    value: volumeGroupName
  } = volumeGroupPickerProps;

  const [addToGroupOpen, setAddToGroupOpen] = useState<boolean>(false);

  const groupsForIndexVolume: Array<IndexVolumeGroup> = useMemo(
    () =>
      indexVolumeGroupMemberships
        .filter(m => m.groupName === name)
        .map(m => groups.find(g => g.name === m.groupName))
        .filter(g => g !== undefined)
        .map(g => g!),
    [groups, indexVolumeGroupMemberships]
  );

  const { componentProps: tableProps } = useIndexVolumeGroupsTable(
    groupsForIndexVolume
  );

  return (
    <div>
      <IconHeader icon="database" text={`Index Volume - ${id}`} />
      <Button
        text="Back"
        onClick={() => history.push(`/s/indexing/volumes/`)}
      />
      <Button text="Add to Group" onClick={() => setAddToGroupOpen(true)} />

      <h2>Group Memberships</h2>
      <ThemedModal
        isOpen={addToGroupOpen}
        header={<IconHeader icon="plus" text="Add Volume to Group" />}
        content={<IndexVolumeGroupPicker {...volumeGroupPickerProps} />}
        actions={
          <DialogActionButtons
            onConfirm={() => {
              if (!!volumeGroupName) {
                volumeApi.addVolumeToGroup(id, volumeGroupName);
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
