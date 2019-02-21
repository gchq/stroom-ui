import * as React from "react";
import { useEffect, useMemo } from "react";

import IconHeader from "../IconHeader";
import Button from "../Button";
import useRouter from "../../lib/useRouter";
import { useIndexVolumeGroupApi } from "../../sections/IndexVolumeGroups";
import {
  useIndexVolumeApi,
  useIndexVolumesTable,
  IndexVolumesTable
} from "../../sections/IndexVolumes";
import useReduxState from "../../lib/useReduxState";
import { IndexVolume, IndexVolumeGroup } from "../../types";
import Loader from "../Loader";

export interface Props {
  name: string;
}

const IndexVolumeGroupEditor = ({ name }: Props) => {
  const { history } = useRouter();
  const groupApi = useIndexVolumeGroupApi();
  const volumeApi = useIndexVolumeApi();
  const { groups, indexVolumes, indexVolumeGroupMemberships } = useReduxState(
    ({
      indexVolumeGroups: { groups },
      indexVolumes: { indexVolumes, indexVolumeGroupMemberships }
    }) => ({
      groups,
      indexVolumes,
      indexVolumeGroupMemberships
    })
  );

  useEffect(() => {
    groupApi.getIndexVolumeGroup(name);
    volumeApi.getIndexVolumesInGroup(name);
  }, [name]);

  const indexVolumeGroup: IndexVolumeGroup | undefined = groups.find(
    g => g.name === name
  );

  const indexVolumesInGroup: Array<IndexVolume> = useMemo(
    () =>
      indexVolumeGroupMemberships
        .filter(m => m.groupName === name)
        .map(m => indexVolumes.find(i => i.id === m.volumeId))
        .filter(v => v !== undefined)
        .map(v => v!),
    [indexVolumes, indexVolumeGroupMemberships]
  );

  const { componentProps: tableProps } = useIndexVolumesTable(
    indexVolumesInGroup
  );

  if (!indexVolumeGroup) {
    return <Loader message={`Loading Index Volume Group ${name}`} />;
  }

  return (
    <div>
      <IconHeader icon="database" text={indexVolumeGroup.name} />
      <Button text="Back" onClick={() => history.push(`/s/indexing/groups/`)} />

      <IndexVolumesTable {...tableProps} />
    </div>
  );
};

export default IndexVolumeGroupEditor;
