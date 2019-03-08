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

import {
  prepareReducer,
  genUseActionCreators
} from "../../lib/redux-actions-ts";
import { IndexVolume, IndexVolumeGroup } from "../../types";
import { onlyUnique } from "../../lib/reduxUtils";
import { mapObject } from "../../lib/treeUtils";
import { StoreState, IndexGroupsForVolumeReceivedAction } from "./types";

const INDEX_VOLUMES_RECEIVED = "INDEX_VOLUMES_RECEIVED";
const INDEX_VOLUMES_IN_GROUP_RECEIVED = "INDEX_VOLUMES_IN_GROUP_RECEIVED";
export const INDEX_GROUPS_FOR_VOLUME_RECEIVED =
  "INDEX_GROUPS_FOR_VOLUME_RECEIVED";
const INDEX_VOLUME_RECEIVED = "INDEX_VOLUME_RECEIVED";
const INDEX_VOLUME_CREATED = "INDEX_VOLUME_CREATED";
const INDEX_VOLUME_DELETED = "INDEX_VOLUME_DELETED";
const INDEX_VOLUME_ADDED_TO_GROUP = "INDEX_VOLUME_ADDED_TO_GROUP";
const INDEX_VOLUME_REMOVED_FROM_GROUP = "INDEX_VOLUME_REMOVED_FROM_GROUP";

interface IndexVolumesReceivedAction extends Action<"INDEX_VOLUMES_RECEIVED"> {
  indexVolumes: Array<IndexVolume>;
}

interface IndexVolumesInGroupReceivedAction
  extends Action<"INDEX_VOLUMES_IN_GROUP_RECEIVED"> {
  groupName: string;
  indexVolumes: Array<IndexVolume>;
}

interface IndexVolumeReceivedAction extends Action<"INDEX_VOLUME_RECEIVED"> {
  indexVolume: IndexVolume;
}

interface IndexVolumeCreatedAction extends Action<"INDEX_VOLUME_CREATED"> {
  indexVolume: IndexVolume;
}

interface IndexVolumeDeletedAction extends Action<"INDEX_VOLUME_DELETED"> {
  indexVolumeId: string;
}

interface IndexVolumeAddedToGroupAction
  extends Action<"INDEX_VOLUME_ADDED_TO_GROUP"> {
  indexVolumeId: string;
  groupName: string;
}

interface IndexVolumeRemovedFromGroupAction
  extends Action<"INDEX_VOLUME_REMOVED_FROM_GROUP"> {
  indexVolumeId: string;
  groupName: string;
}
export const useActionCreators = genUseActionCreators({
  indexVolumesReceived: (
    indexVolumes: Array<IndexVolume>
  ): IndexVolumesReceivedAction => ({
    type: INDEX_VOLUMES_RECEIVED,
    indexVolumes
  }),
  indexVolumesInGroupReceived: (
    groupName: string,
    indexVolumes: Array<IndexVolume>
  ): IndexVolumesInGroupReceivedAction => ({
    type: INDEX_VOLUMES_IN_GROUP_RECEIVED,
    groupName,
    indexVolumes
  }),
  indexGroupsForVolumeReceived: (
    indexVolumeId: string,
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
  indexVolumeDeleted: (indexVolumeId: string): IndexVolumeDeletedAction => ({
    type: INDEX_VOLUME_DELETED,
    indexVolumeId
  }),
  indexVolumeAddedToGroup: (
    indexVolumeId: string,
    groupName: string
  ): IndexVolumeAddedToGroupAction => ({
    type: INDEX_VOLUME_ADDED_TO_GROUP,
    indexVolumeId,
    groupName
  }),
  indexVolumeRemovedFromGroup: (
    indexVolumeId: string,
    groupName: string
  ): IndexVolumeRemovedFromGroupAction => ({
    type: INDEX_VOLUME_REMOVED_FROM_GROUP,
    indexVolumeId,
    groupName
  })
});

const defaultState: StoreState = {
  indexVolumes: [],
  indexVolumesByGroup: {},
  groupsByIndexVolume: {}
};

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
    (state: StoreState, { groupName, indexVolumes }) => ({
      ...state,
      indexVolumesByGroup: {
        ...state.indexVolumesByGroup,
        [groupName]: indexVolumes
      }
    })
  )
  .handleAction<IndexGroupsForVolumeReceivedAction>(
    INDEX_GROUPS_FOR_VOLUME_RECEIVED,
    (state: StoreState, { indexVolumeId, groups }) => ({
      ...state,
      groupsByIndexVolume: {
        ...state.groupsByIndexVolume,
        [indexVolumeId]: groups
      }
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
      indexVolumes: state.indexVolumes.concat([indexVolume]).filter(onlyUnique)
    })
  )
  .handleAction<IndexVolumeDeletedAction>(
    INDEX_VOLUME_DELETED,
    (state: StoreState, { indexVolumeId }) => ({
      indexVolumes: state.indexVolumes.filter(v => v.id !== indexVolumeId),
      groupsByIndexVolume: mapObject(
        state.groupsByIndexVolume,
        (vId, groups) => {
          if (vId == indexVolumeId) {
            return undefined;
          } else {
            return groups;
          }
        }
      ),
      indexVolumesByGroup: mapObject(state.indexVolumesByGroup, (_, volumes) =>
        volumes.filter(v => v.id !== indexVolumeId)
      )
    })
  )
  .handleAction<IndexVolumeAddedToGroupAction>(
    INDEX_VOLUME_ADDED_TO_GROUP,
    (state: StoreState, { indexVolumeId, groupName }) => ({
      ...state,
      groupsByIndexVolume: mapObject(
        state.groupsByIndexVolume,
        (vId, groups) => {
          if (vId == indexVolumeId) {
            return groups; // where should we get the full group from?
          } else {
            return groups;
          }
        }
      ),
      indexVolumesByGroup: mapObject(
        state.indexVolumesByGroup,
        (gName, volumes) => {
          if (gName == groupName) {
            return volumes; // where should we get the full volume from?
          } else {
            return volumes;
          }
        }
      )
    })
  )
  .handleAction<IndexVolumeRemovedFromGroupAction>(
    INDEX_VOLUME_REMOVED_FROM_GROUP,
    (state: StoreState, { indexVolumeId, groupName }) => ({
      ...state,
      groupsByIndexVolume: mapObject(
        state.groupsByIndexVolume,
        (vId, groups) => {
          if (vId === indexVolumeId) {
            return groups.filter(g => g.name !== groupName);
          } else {
            return groups;
          }
        }
      ),
      indexVolumesByGroup: mapObject(
        state.indexVolumesByGroup,
        (gName, volumes) => {
          if (gName === groupName) {
            return volumes.filter(v => v.id !== indexVolumeId);
          } else {
            return volumes;
          }
        }
      )
    })
  )
  .getReducer();
