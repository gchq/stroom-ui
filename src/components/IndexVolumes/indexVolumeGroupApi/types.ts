import { HasAuditInfo } from "components/DocumentEditors/api/explorer/types";

export interface IndexVolumeGroup extends HasAuditInfo {
  id: number;
  name: string;
}
