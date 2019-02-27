import IndexVolumeGroups from "./IndexVolumeGroups";
import { useActionCreators, reducer, StoreState } from "./redux";
import { useApi as useIndexVolumeGroupApi } from "./useIndexVolumeGroupApi";
import IndexVolumeGroupsTable, {
  useTable as useIndexVolumeGroupsTable
} from "./IndexVolumeGroupsTable";

export {
  IndexVolumeGroups,
  useActionCreators,
  reducer,
  StoreState,
  useIndexVolumeGroupApi,
  IndexVolumeGroupsTable,
  useIndexVolumeGroupsTable
};

export default IndexVolumeGroups;
