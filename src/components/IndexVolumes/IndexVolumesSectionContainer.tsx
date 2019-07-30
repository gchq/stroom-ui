import * as React from "react";

import IndexVolumesSection from "./IndexVolumesSection";
import { useIndexVolumes, IndexVolume } from "./indexVolumeApi";
import { useIndexVolumeGroups, IndexVolumeGroup } from "./indexVolumeGroupApi";

const IndexVolumes: React.FunctionComponent = () => {
  const {
    indexVolumes,
    createIndexVolume,
    deleteIndexVolume,
    update,
  } = useIndexVolumes();

  const {
    groups,
    createIndexVolumeGroup,
    update: updateIndexVolumeGroup,
    deleteIndexVolumeGroup,
  } = useIndexVolumeGroups();

  return (
    <IndexVolumesSection
      onGroupAdd={() => createIndexVolumeGroup()}
      onGroupChange={(indexVolumeGroup: IndexVolumeGroup) =>
        updateIndexVolumeGroup(indexVolumeGroup)
      }
      onGroupDelete={(id: string) => deleteIndexVolumeGroup(id)}
      onVolumeAdd={indexVolumeGroupId =>
        createIndexVolume({ indexVolumeGroupId })
      }
      onVolumeChange={(indexVolume: IndexVolume) => update(indexVolume)}
      onVolumeDelete={id => deleteIndexVolume(id)}
      onVolumeMove={() => console.log("TODO: onGroupAdd")}
      indexVolumeGroups={groups}
      indexVolumes={indexVolumes}
    />
  );
};

export default IndexVolumes;