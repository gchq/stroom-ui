import { Dispatch } from "redux";
import { GlobalStoreState } from "../../startup/reducers";

import { actionCreators } from "./redux";
import {
  wrappedGet,
  wrappedPost,
  wrappedDelete
} from "../../lib/fetchTracker.redux";
import { IndexVolume } from "../../types";
import useThunk from "../../lib/useThunk";

const {
  indexVolumesReceived,
  indexVolumeReceived,
  indexVolumesInGroupReceived,
  indexVolumeCreated,
  indexVolumeDeleted,
  indexVolumeAddedToGroup,
  indexVolumeRemovedFromGroup
} = actionCreators;

export const getIndexVolumes = () => (
  dispatch: Dispatch,
  getState: () => GlobalStoreState
) => {
  const state = getState();

  var url = new URL(
    `${state.config.values.stroomBaseServiceUrl}/stroom-index/volume/v1`
  );

  wrappedGet(
    dispatch,
    state,
    url.href,
    r =>
      r
        .json()
        .then((indexVolumes: Array<IndexVolume>) =>
          dispatch(indexVolumesReceived(indexVolumes))
        ),
    {},
    true
  );
};
export const useGetIndexVolumes = () => useThunk(getIndexVolumes);

export const getIndexVolumeById = (id: number) => (
  dispatch: Dispatch,
  getState: () => GlobalStoreState
) => {
  const state = getState();

  var url = new URL(
    `${state.config.values.stroomBaseServiceUrl}/stroom-index/volume/v1/${id}`
  );

  wrappedGet(
    dispatch,
    state,
    url.href,
    r =>
      r
        .json()
        .then((indexVolume: IndexVolume) =>
          dispatch(indexVolumeReceived(indexVolume))
        ),
    {},
    true
  );
};
export const useGetIndexVolumeById = () => useThunk(getIndexVolumeById);

export const deleteIndexVolume = (id: number) => (
  dispatch: Dispatch,
  getState: () => GlobalStoreState
) => {
  const state = getState();

  var url = new URL(
    `${state.config.values.stroomBaseServiceUrl}/stroom-index/volume/v1/${id}`
  );

  wrappedDelete(
    dispatch,
    state,
    url.href,
    r =>
      r
        .json()
        .then((indexVolume: IndexVolume) => dispatch(indexVolumeDeleted(id))),
    {}
  );
};
export const useDeleteIndexVolume = () => useThunk(deleteIndexVolume);

export const getIndexVolumesInGroup = (groupName: string) => (
  dispatch: Dispatch,
  getState: () => GlobalStoreState
) => {
  const state = getState();

  var url = new URL(
    `${
      state.config.values.stroomBaseServiceUrl
    }/stroom-index/volume/v1/inGroup/${groupName}`
  );

  wrappedGet(
    dispatch,
    state,
    url.href,
    r =>
      r
        .json()
        .then((indexVolumes: Array<IndexVolume>) =>
          dispatch(indexVolumesInGroupReceived(groupName, indexVolumes))
        ),
    {},
    true
  );
};
export const useGetIndexVolumesInGroup = () => useThunk(getIndexVolumesInGroup);

export const createIndexVolume = (nodeName: string, path: string) => (
  dispatch: Dispatch,
  getState: () => GlobalStoreState
) => {
  const state = getState();

  var url = new URL(
    `${state.config.values.stroomBaseServiceUrl}/stroom-index/volume/v1/${name}`
  );

  const body = JSON.stringify({ nodeName, path });

  wrappedPost(
    dispatch,
    state,
    url.href,
    response =>
      response
        .json()
        .then((indexVolume: IndexVolume) =>
          dispatch(indexVolumeCreated(indexVolume))
        ),
    { body }
  );
};
export const useCreateIndexVolume = () => useThunk(createIndexVolume);

export const addVolumeToGroup = (indexVolumeId: number, groupName: string) => (
  dispatch: Dispatch,
  getState: () => GlobalStoreState
) => {
  const state = getState();

  var url = new URL(
    `${
      state.config.values.stroomBaseServiceUrl
    }/stroom-index/volume/v1/inGroup/{volumeId}/{groupName}`
  );

  wrappedPost(dispatch, state, url.href, response =>
    response
      .text()
      .then(() => dispatch(indexVolumeAddedToGroup(indexVolumeId, groupName)))
  );
};
export const useAddVolumeToGroup = () => useThunk(addVolumeToGroup);

export const removeVolumeFromGroup = (
  indexVolumeId: number,
  groupName: string
) => (dispatch: Dispatch, getState: () => GlobalStoreState) => {
  const state = getState();

  var url = new URL(
    `${
      state.config.values.stroomBaseServiceUrl
    }/stroom-index/volume/v1/inGroup/{volumeId}/{groupName}`
  );

  wrappedDelete(dispatch, state, url.href, response =>
    response
      .text()
      .then(() =>
        dispatch(indexVolumeRemovedFromGroup(indexVolumeId, groupName))
      )
  );
};
export const useRemoveVolumeFromGroup = () => useThunk(removeVolumeFromGroup);
