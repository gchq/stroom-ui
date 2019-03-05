import IndexVolumes from "./IndexVolumes";
import { useActionCreators, reducer, StoreState } from "./redux";
import useIndexVolumeApi from "../../api/indexVolume/useApi";
import IndexVolumesTable, {
  useTable as useIndexVolumesTable
} from "./IndexVolumesTable";

export {
  IndexVolumes,
  useActionCreators,
  reducer,
  StoreState,
  useIndexVolumeApi,
  IndexVolumesTable,
  useIndexVolumesTable
};

export default IndexVolumes;
