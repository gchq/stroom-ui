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
  XsltDoc
} from "../../types";
import { testPipelines, elements, elementProperties } from "./pipelines";
import testDocRefsTypes from "./docRefTypes";
import { generateTestXslt } from "./xslt";
import { generateTestIndex } from "./indexDocs";
import { generateTestDictionary } from "./dictionary";
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
import { UserGroupMembership, TestData } from "../testTypes";

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
    var user: User = users[userIndex];
    userGroupMemberships.push({
      userUuid: user.uuid,
      groupUuid: group.uuid
    });

    userIndex = (userIndex + 1) % users.length;
  }
});

let indexVolumeGroups: Array<IndexVolumeGroup> = Array(5)
  .fill(1)
  .map(generateTestIndexVolumeGroup);

let indexVolumes: Array<IndexVolume> = Array(30)
  .fill(1)
  .map(generateTestIndexVolume);

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

let dictionaries: { [uuid: string]: Dictionary } = Array(5)
  .fill(null)
  .map(generateTestDictionary)
  .reduce(
    (acc, i) => ({
      ...acc,
      [i.uuid]: i
    }),
    {}
  );

let xslt: { [uuid: string]: XsltDoc } = Array(5)
  .fill(null)
  .map(generateTestXslt)
  .reduce(
    (acc, i) => ({
      ...acc,
      [i.uuid]: i
    }),
    {}
  );

let trackers: Array<StreamTaskType> = Array(10)
  .fill(null)
  .map(generateGenericTracker);

let indexes: { [uuid: string]: IndexDoc } = Array(5)
  .fill(null)
  .map(generateTestIndex)
  .reduce(
    (acc, i) => ({
      ...acc,
      [i.uuid]: i
    }),
    {}
  );

const docTree = {
  uuid: "0",
  type: "System",
  name: "System",
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
      name: "Dictionaries",
      type: "Folder",
      children: Object.entries(dictionaries)
        .map(k => k[1])
        .map(copyDocRef)
    },
    {
      uuid: uuidv4(),
      name: "Indexes",
      type: "Folder",
      children: Object.entries(indexes)
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
    },
    {
      uuid: uuidv4(),
      name: "Empty Directory with a Long Name",
      type: "Folder",
      children: []
    }
  ]
} as DocRefTree;

export const fullTestData: TestData = {
  documentTree: docTree,
  docRefTypes: testDocRefsTypes,
  elements,
  elementProperties,
  pipelines: testPipelines,
  xslt,
  dictionaries,
  dataList,
  dataSource,
  trackers,
  usersAndGroups: {
    users: users.concat(groups),
    userGroupMemberships
  },
  indexVolumesAndGroups: {
    volumes: indexVolumes,
    groups: indexVolumeGroups,
    groupMemberships: indexVolumeGroupMemberships
  },
  indexes
};

export default fullTestData;
