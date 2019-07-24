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
  } = useIndexVolumeGroups();

  // TODO: All the retrieval of data is going to happen here, and it's going to
  // be passed down. This area is pretty simple and this should be fine.
  return (
    <IndexVolumesSection
      onGroupAdd={() => createIndexVolumeGroup()}
      onGroupChange={(indexVolumeGroup: IndexVolumeGroup) =>
        updateIndexVolumeGroup(indexVolumeGroup)
      }
      onGroupDelete={() => console.log("TODO: onGroupAdd")}
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
