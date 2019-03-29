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
import * as uuidv4 from "uuid/v4";

import {
  DocRefTree,
  copyDocRef,
  Dictionary,
  StreamTaskType,
  IndexDoc,
  XsltDoc,
  DocumentType,
  XMLSchemaDoc,
  VisualisationDoc,
  StatisticsStoreDoc,
  StroomStatsStoreDoc,
  ScriptDoc,
  ElasticIndexDoc,
  DashboardDoc,
  AnnotationsIndexDoc,
  FeedDoc
} from "../../types";
import { testPipelines, elements, elementProperties } from "./pipelines";
import testDocRefsTypes from "./docRefTypes";
import { generate as generateAnnotationsIndex } from "./annotationsIndex";
import { generate as generateDashboard } from "./dashboard";
import { generate as generateDictionary } from "./dictionary";
import { generate as generateElasticIndex } from "./elasticIndex";
import { generate as generateFeed } from "./feed";
import { generate as generateIndex } from "./indexDocs";
import { generate as generateScript } from "./script";
import { generate as generateStatisticsStore } from "./statisticsStore";
import { generate as generateStroomStatsStore } from "./stroomStatsStore";
import { generate as generateVisualisation } from "./visualisation";
import { generate as generateXmlSchema } from "./xmlSchema";
import { generate as generateXslt } from "./xslt";
import { generateGenericTracker } from "./trackers";
import { dataList, dataSource } from "./data";
import { generateTestUser, generateTestGroup } from "./usersAndGroups";
import {
  generateTestIndexVolumeGroup,
  generateTestIndexVolume
} from "./indexVolumes";
import {
  IndexVolumeGroupMembership,
  User,
  IndexVolumeGroup,
  IndexVolume
} from "../../types";
import allAppPermissions from "./appPermissions";
import { UserGroupMembership, TestData, UserDocPermission } from "../testTypes";
import { documentPermissionNames } from "./docPermissions";
import { iterateNodes } from "../../lib/treeUtils";

let docPermissionByType = testDocRefsTypes.reduce(
  (acc, curr) => ({ ...acc, [curr]: documentPermissionNames }),
  {}
);

let groups: Array<User> = Array(5)
  .fill(1)
  .map(generateTestGroup);
let users: Array<User> = Array(30)
  .fill(1)
  .map(generateTestUser);
let userGroupMemberships: Array<UserGroupMembership> = [];
let userIndex = 0;
groups.forEach(group => {
  for (let x = 0; x < 10; x++) {
    var user: User = users[userIndex++];
    userIndex %= users.length; // wrap
    userGroupMemberships.push({
      userUuid: user.uuid,
      groupUuid: group.uuid
    });
  }
});
const allUsers = users.concat(groups);
let permissionIndex = 0;
const userAppPermissions = {};
allUsers.forEach(u => {
  let permissions = [];
  for (let x = 0; x < 2; x++) {
    permissions.push(allAppPermissions[permissionIndex++]);
    permissionIndex %= allAppPermissions.length; // wrap the index
  }
  userAppPermissions[u.uuid] = permissions;
});

let indexVolumeGroups: Array<IndexVolumeGroup> = Array(5)
  .fill(1)
  .map(generateTestIndexVolumeGroup);

let indexVolumes: Array<IndexVolume> = Array(30)
  .fill(1)
  .map(generateTestIndexVolume);

let annotationIndexes: Array<AnnotationsIndexDoc> = Array(3)
  .fill(1)
  .map(generateAnnotationsIndex);
let dashboards: Array<DashboardDoc> = Array(3)
  .fill(1)
  .map(generateDashboard);
let elasticIndexes: Array<ElasticIndexDoc> = Array(3)
  .fill(1)
  .map(generateElasticIndex);
let feeds: Array<FeedDoc> = Array(3)
  .fill(1)
  .map(generateFeed);
let scripts: Array<ScriptDoc> = Array(3)
  .fill(1)
  .map(generateScript);
let statisticsStores: Array<StatisticsStoreDoc> = Array(3)
  .fill(1)
  .map(generateStatisticsStore);
let stroomStatsStores: Array<StroomStatsStoreDoc> = Array(3)
  .fill(1)
  .map(generateStroomStatsStore);
let visualisations: Array<VisualisationDoc> = Array(3)
  .fill(1)
  .map(generateVisualisation);
let xmlSchemas: Array<XMLSchemaDoc> = Array(3)
  .fill(1)
  .map(generateXmlSchema);

let indexVolumeGroupMemberships: Array<IndexVolumeGroupMembership> = [];
let indexVolumeIndex = 0; // Best variable name ever
indexVolumeGroups.forEach(group => {
  for (let x = 0; x < 10; x++) {
    let indexVolume: IndexVolume = indexVolumes[indexVolumeIndex];
    indexVolumeGroupMemberships.push({
      groupName: group.name,
      volumeId: indexVolume.id
    });

    indexVolumeIndex = (indexVolumeIndex + 1) % indexVolumes.length;
  }
});

let reduceByUuid = <T extends string, D extends DocumentType<T>>(
  acc: { [uuid: string]: D },
  i: D
) => ({
  ...acc,
  [i.uuid]: i
});

let dictionaries: { [uuid: string]: Dictionary } = Array(5)
  .fill(null)
  .map(generateDictionary)
  .reduce(reduceByUuid, {});

let xslt: { [uuid: string]: XsltDoc } = Array(5)
  .fill(null)
  .map(generateXslt)
  .reduce(reduceByUuid, {});

let trackers: Array<StreamTaskType> = Array(10)
  .fill(null)
  .map(generateGenericTracker);

let indexes: { [uuid: string]: IndexDoc } = Array(5)
  .fill(null)
  .map(generateIndex)
  .reduce(reduceByUuid, {});

const docTree = {
  uuid: "0",
  type: "System",
  name: "System",
  children: [
    {
      uuid: uuidv4(),
      name: "Raw Materials",
      type: "Folder",
      children: [
        {
          uuid: uuidv4(),
          name: "Dictionaries",
          type: "Folder",
          children: Object.entries(dictionaries)
            .map(k => k[1])
            .map(copyDocRef)
        },
        {
          uuid: uuidv4(),
          name: "XSLT",
          type: "Folder",
          children: Object.entries(xslt)
            .map(k => k[1])
            .map(copyDocRef)
        }
      ]
    },
    {
      uuid: uuidv4(),
      name: "Compound Stuff",
      type: "Folder",
      children: [
        {
          uuid: uuidv4(),
          name: "Pipelines",
          type: "Folder",
          children: Object.entries(testPipelines)
            .map(k => k[1])
            .map(k => k.docRef)
            .map(copyDocRef)
        },
        {
          uuid: uuidv4(),
          name: "Indexes",
          type: "Folder",
          children: Object.entries(indexes)
            .map(k => k[1])
            .map(copyDocRef)
        }
      ]
    },
    {
      uuid: uuidv4(),
      name: "Empty Directory with a Long Name",
      type: "Folder",
      children: []
    }
  ]
} as DocRefTree;

const userDocPermission: Array<UserDocPermission> = [];

// give first two users permissions to all documents
iterateNodes(docTree, (_, { uuid: docRefUuid }) => {
  allUsers.slice(0, 2).forEach(({ uuid: userUuid }) => {
    documentPermissionNames
      .filter(p => p !== "OWNER")
      .forEach(permissionName => {
        userDocPermission.push({
          userUuid,
          docRefUuid,
          permissionName
        });
      });
  });
});

export const fullTestData: TestData = {
  documentTree: docTree,
  docRefTypes: testDocRefsTypes,
  elements,
  elementProperties,
  pipelines: Object.values(testPipelines),
  xslt: Object.values(xslt),
  dictionaries: Object.values(dictionaries),
  dataList,
  dataSource,
  trackers,
  usersAndGroups: {
    users: allUsers,
    userGroupMemberships
  },
  indexVolumesAndGroups: {
    volumes: indexVolumes,
    groups: indexVolumeGroups,
    groupMemberships: indexVolumeGroupMemberships
  },
  indexes: Object.values(indexes),
  allAppPermissions,
  userAppPermissions,
  docPermissionByType,
  userDocPermission,
  annotationIndexes,
  dashboards,
  elasticIndexes,
  feeds,
  scripts,
  statisticsStores,
  stroomStatsStores,
  visualisations,
  xmlSchemas
};

export default fullTestData;
