import { IndexVolumeGroup } from "../../types";

export interface StoreState {
  groupNames: Array<string>;
  groups: Array<IndexVolumeGroup>;
}
