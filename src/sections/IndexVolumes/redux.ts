/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Action } from "redux";

import { prepareReducer } from "../../lib/redux-actions-ts";
import {
  IndexVolume,
  IndexVolumeGroupMembership,
  IndexVolumeGroup
} from "../../types";

const INDEX_VOLUMES_RECEIVED = "INDEX_VOLUMES_RECEIVED";
const INDEX_VOLUMES_IN_GROUP_RECEIVED = "INDEX_VOLUMES_IN_GROUP_RECEIVED";
const INDEX_GROUPS_FOR_VOLUME_RECEIVED = "INDEX_GROUPS_FOR_VOLUME_RECEIVED";
const INDEX_VOLUME_RECEIVED = "INDEX_VOLUME_RECEIVED";
const INDEX_VOLUME_CREATED = "INDEX_VOLUME_CREATED";
const INDEX_VOLUME_DELETED = "INDEX_VOLUME_DELETED";
const INDEX_VOLUME_ADDED_TO_GROUP = "INDEX_VOLUME_ADDED_TO_GROUP";
const INDEX_VOLUME_REMOVED_FROM_GROUP = "INDEX_VOLUME_REMOVED_FROM_GROUP";

export interface IndexVolumesReceivedAction
  extends Action<"INDEX_VOLUMES_RECEIVED"> {
  indexVolumes: Array<IndexVolume>;
}

export interface IndexVolumesInGroupReceivedAction
  extends Action<"INDEX_VOLUMES_IN_GROUP_RECEIVED"> {
  groupName: string;
  indexVolumeIds: Array<number>;
}
export interface IndexGroupsForVolumeReceivedAction
  extends Action<"INDEX_GROUPS_FOR_VOLUME_RECEIVED"> {
  indexVolumeId: number;
  groups: Array<IndexVolumeGroup>;
}

export interface IndexVolumeReceivedAction
  extends Action<"INDEX_VOLUME_RECEIVED"> {
  indexVolume: IndexVolume;
}

export interface IndexVolumeCreatedAction
  extends Action<"INDEX_VOLUME_CREATED"> {
  indexVolume: IndexVolume;
}

export interface IndexVolumeDeletedAction
  extends Action<"INDEX_VOLUME_DELETED"> {
  indexVolumeId: number;
}

export interface IndexVolumeAddedToGroupAction
  extends Action<"INDEX_VOLUME_ADDED_TO_GROUP"> {
  indexVolumeId: number;
  groupName: string;
}

export interface IndexVolumeRemovedFromGroupAction
  extends Action<"INDEX_VOLUME_REMOVED_FROM_GROUP"> {
  indexVolumeId: number;
  groupName: string;
}
export const actionCreators = {
  indexVolumesReceived: (
    indexVolumes: Array<IndexVolume>
  ): IndexVolumesReceivedAction => ({
    type: INDEX_VOLUMES_RECEIVED,
    indexVolumes
  }),
  indexVolumesInGroupReceived: (
    groupName: string,
    indexVolumeIds: Array<number>
  ): IndexVolumesInGroupReceivedAction => ({
    type: INDEX_VOLUMES_IN_GROUP_RECEIVED,
    groupName,
    indexVolumeIds
  }),
  indexGroupsForVolumeReceived: (
    indexVolumeId: number,
    groups: Array<IndexVolumeGroup>
  ): IndexGroupsForVolumeReceivedAction => ({
    type: INDEX_GROUPS_FOR_VOLUME_RECEIVED,
    indexVolumeId,
    groups
  }),
  indexVolumeReceived: (
    indexVolume: IndexVolume
  ): IndexVolumeReceivedAction => ({
    type: INDEX_VOLUME_RECEIVED,
    indexVolume
  }),
  indexVolumeCreated: (indexVolume: IndexVolume): IndexVolumeCreatedAction => ({
    type: INDEX_VOLUME_CREATED,
    indexVolume
  }),
  indexVolumeDeleted: (indexVolumeId: number): IndexVolumeDeletedAction => ({
    type: INDEX_VOLUME_DELETED,
    indexVolumeId
  }),
  indexVolumeAddedToGroup: (
    indexVolumeId: number,
    groupName: string
  ): IndexVolumeAddedToGroupAction => ({
    type: INDEX_VOLUME_ADDED_TO_GROUP,
    indexVolumeId,
    groupName
  }),
  indexVolumeRemovedFromGroup: (
    indexVolumeId: number,
    groupName: string
  ): IndexVolumeRemovedFromGroupAction => ({
    type: INDEX_VOLUME_REMOVED_FROM_GROUP,
    indexVolumeId,
    groupName
  })
};

export interface StoreState {
  indexVolumes: Array<IndexVolume>;
  indexVolumeGroupMemberships: Array<IndexVolumeGroupMembership>;
}

export const defaultState: StoreState = {
  indexVolumes: [],
  indexVolumeGroupMemberships: []
};

function onlyUnique<VALUE>(value: VALUE, index: number, self: Array<VALUE>) {
  return self.indexOf(value) === index;
}

export const reducer = prepareReducer(defaultState)
  .handleAction<IndexVolumesReceivedAction>(
    INDEX_VOLUMES_RECEIVED,
    (state: StoreState, { indexVolumes }) => ({
      ...state,
      indexVolumes
    })
  )
  .handleAction<IndexVolumesInGroupReceivedAction>(
    INDEX_VOLUMES_IN_GROUP_RECEIVED,
    (state: StoreState, { groupName, indexVolumeIds }) => ({
      ...state,
      indexVolumeGroupMemberships: [
        ...state.indexVolumeGroupMemberships
      ].concat(
        indexVolumeIds.map(volumeId => ({
          volumeId,
          groupName
        }))
      )
    })
  )
  .handleAction<IndexGroupsForVolumeReceivedAction>(
    INDEX_GROUPS_FOR_VOLUME_RECEIVED,
    (state: StoreState, { indexVolumeId, groups }) => ({
      ...state,
      indexVolumeGroupMemberships: state.indexVolumeGroupMemberships
        .concat(
          groups.map(g => ({ groupName: g.name, volumeId: indexVolumeId }))
        )
        .filter(onlyUnique)
    })
  )
  .handleAction<IndexVolumeReceivedAction>(
    INDEX_VOLUME_RECEIVED,
    (state: StoreState, { indexVolume }) => ({
      ...state,
      indexVolumes: state.indexVolumes.concat([indexVolume]).filter(onlyUnique)
    })
  )
  .handleAction<IndexVolumeCreatedAction>(
    INDEX_VOLUME_CREATED,
    (state: StoreState, { indexVolume }) => ({
      ...state,
      indexVolumes: state.indexVolumes.concat([indexVolume])
    })
  )
  .handleAction<IndexVolumeDeletedAction>(
    INDEX_VOLUME_DELETED,
    (state: StoreState, { indexVolumeId }) => ({
      indexVolumes: state.indexVolumes.filter(v => v.id !== indexVolumeId),
      indexVolumeGroupMemberships: state.indexVolumeGroupMemberships.filter(
        m => m.volumeId === indexVolumeId
      )
    })
  )
  .handleAction<IndexVolumeAddedToGroupAction>(
    INDEX_VOLUME_ADDED_TO_GROUP,
    (state: StoreState, { indexVolumeId, groupName }) => ({
      ...state,
      indexVolumeGroupMemberships: state.indexVolumeGroupMemberships.concat([
        {
          volumeId: indexVolumeId,
          groupName
        }
      ])
    })
  )
  .handleAction<IndexVolumeRemovedFromGroupAction>(
    INDEX_VOLUME_REMOVED_FROM_GROUP,
    (state: StoreState, { indexVolumeId, groupName }) => ({
      ...state,
      indexVolumeGroupMemberships: state.indexVolumeGroupMemberships.filter(
        m => m.groupName === groupName && m.volumeId === indexVolumeId
      )
    })
  )
  .getReducer();
