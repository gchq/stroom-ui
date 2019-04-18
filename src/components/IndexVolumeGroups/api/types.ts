import { HasAuditInfo } from "src/components/DocumentEditors/api/explorer/types";

export interface IndexVolumeGroup extends HasAuditInfo {
  name: string;
}

export interface IndexVolumeGroupMembership {
  volumeId: string;
  groupName: string;
}
