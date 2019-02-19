import IndexVolumes from "./IndexVolumes";
import { actionCreators, reducer, StoreState } from "./redux";
import useIndexVolumeApi from "./useIndexVolumeApi";
import IndexVolumesTable, {
  useTable as useIndexVolumesTable
} from "./IndexVolumesTable";

export {
  IndexVolumes,
  actionCreators,
  reducer,
  StoreState,
  useIndexVolumeApi,
  IndexVolumesTable,
  useIndexVolumesTable
};

export default IndexVolumes;
