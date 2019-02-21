import * as React from "react";
import { useEffect, useMemo } from "react";

import IconHeader from "../IconHeader";
import Button from "../Button";
import useRouter from "../../lib/useRouter";
import { useIndexVolumeApi } from "../../sections/IndexVolumes";
import {
  useIndexVolumeGroupsTable,
  IndexVolumeGroupsTable
} from "../../sections/IndexVolumeGroups";
import useReduxState from "../../lib/useReduxState";
import { IndexVolumeGroup } from "../../types";

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

      <h2>Group Memberships</h2>
      <IndexVolumeGroupsTable {...tableProps} />
    </div>
  );
};

export default IndexVolumeEditor;
