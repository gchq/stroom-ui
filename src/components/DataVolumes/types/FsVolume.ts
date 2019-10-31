import { HasAuditInfo } from "components/DocumentEditors/api/explorer/types";
import { VolumeUseStatus } from "./VolumeUseStatus";
import FsVolumeState from "./FsVolumeState";

/**
 * Represents a file system volume, matches FsVolume.java
 */
export default interface FsVolume extends HasAuditInfo {
  readonly id: number;
  readonly version: number;
  path: string;
  status: VolumeUseStatus;
  byteLimit: number;
  readonly volumeState: FsVolumeState;
};
