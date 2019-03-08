import { IndexVolume, IndexVolumeGroup } from "../../types";
import { Action } from "redux";

export interface StoreState {
  indexVolumes: Array<IndexVolume>;
  indexVolumesByGroup: { [groupName: string]: Array<IndexVolume> };
  groupsByIndexVolume: { [volumeId: string]: Array<IndexVolumeGroup> };
}

export interface IndexGroupsForVolumeReceivedAction
  extends Action<"INDEX_GROUPS_FOR_VOLUME_RECEIVED"> {
  indexVolumeId: string;
  groups: Array<IndexVolumeGroup>;
}
