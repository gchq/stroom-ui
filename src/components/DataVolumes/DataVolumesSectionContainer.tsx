import * as React from "react";

import DataVolumesSection from "./DataVolumesSection";
import useDataVolumes from "./api/useDataVolumes";
import FsVolume from "./types/FsVolume";

const DataVolumes: React.FunctionComponent = () => {
  const {
    volumes,
    createVolume,
    deleteVolume,
    update,
    refresh: refreshDataVolumes,
  } = useDataVolumes();

  return (
    <DataVolumesSection
      onVolumeAdd={() => createVolume()}
      onVolumeChange={(volume: FsVolume) => update(volume)}
      onVolumeDelete={volume => deleteVolume(volume.id)}
      volumes={volumes}
    />
  );
};

export default DataVolumes;
