import { HasAuditInfo } from "src/types";

export interface IndexVolumeGroup extends HasAuditInfo {
  name: string;
}

export interface IndexVolumeGroupMembership {
  volumeId: string;
  groupName: string;
}
