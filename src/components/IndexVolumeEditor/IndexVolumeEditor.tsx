import * as React from "react";
import { useEffect } from "react";

import IconHeader from "../IconHeader";
import Button from "../Button";
import useHistory from "../../lib/useHistory";
import { useIndexVolumeApi } from "../../sections/IndexVolumes";
import {
  useIndexVolumeGroupsTable,
  IndexVolumeGroupsTable
} from "../../sections/IndexVolumeGroups";
import useReduxState from "../../lib/useReduxState";
import { IndexVolumeGroup } from "src/types";

export interface Props {
  id: number;
}

const IndexVolumeEditor = ({ id }: Props) => {
  const history = useHistory();
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

  const groupsForIndexVolume: Array<
    IndexVolumeGroup
  > = indexVolumeGroupMemberships
    .filter(m => m.groupName === name)
    .map(m => groups.find(g => g.name === m.groupName))
    .filter(g => g !== undefined)
    .map(g => g!);

  const { componentProps: tableProps } = useIndexVolumeGroupsTable(
    groupsForIndexVolume
  );

  return (
    <div>
      <IconHeader icon="database" text={`Index Volume ${id}`} />
      <Button
        text="Back"
        onClick={() => history.push(`/s/indexing/volumes/`)}
      />
      <IndexVolumeGroupsTable {...tableProps} />
    </div>
  );
};

export default IndexVolumeEditor;
