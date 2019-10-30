import { HasAuditInfo } from "components/DocumentEditors/api/explorer/types";

// TODO: Just copied these from IndexDataVolumes. I don't know what overlap
// there is yet -- I'll have to see what's on the DB now that they're separate.
export default interface DataVolume extends HasAuditInfo {
  streamId: string;
  volumePath: string;
}
