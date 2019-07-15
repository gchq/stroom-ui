import { IndexVolumeGroup } from "./indexVolumeGroupApi";
import { IndexVolume } from "./indexVolumeApi";
import { IndexVolumeGroupMembership } from "components/IndexVolumeGroups/api";

export const indexVolumeGroup01: IndexVolumeGroup = {
  name: "Index volume group 01",
  createTimeMs: Date.now(),
  updateTimeMs: Date.now(),
  createUser: "Test user",
  updateUser: "Updating user",
};

export const indexVolumeGroup02: IndexVolumeGroup = {
  name: "Index volume group 02",
  createTimeMs: Date.now(),
  updateTimeMs: Date.now(),
  createUser: "Test user",
  updateUser: "Updating user",
};

export const indexVolume01: IndexVolume = {
  nodeName: "Index volume name 01",
  path: "/some/amazing/path",
  bytesFree: 1,
  bytesLimit: 1,
  bytesTotal: 1,
  bytesUsed: 1,
  createTimeMs: Date.now(),
  createUser: "Creating user",
  id: "1",
  statusMs: Date.now(),
  updateTimeMs: Date.now(),
  updateUser: "Updating user",
};

export const indexVolume02: IndexVolume = {
  nodeName: "Index volume name 02",
  path: "/some/amazing/path",
  bytesFree: 1,
  bytesLimit: 1,
  bytesTotal: 1,
  bytesUsed: 1,
  createTimeMs: Date.now(),
  createUser: "Creating user",
  id: "2",
  statusMs: Date.now(),
  updateTimeMs: Date.now(),
  updateUser: "Updating user",
};

export const indexVolume03: IndexVolume = {
  nodeName: "Index volume name 03",
  path: "/some/amazing/path",
  bytesFree: 1,
  bytesLimit: 1,
  bytesTotal: 1,
  bytesUsed: 1,
  createTimeMs: Date.now(),
  createUser: "Creating user",
  id: "3",
  statusMs: Date.now(),
  updateTimeMs: Date.now(),
  updateUser: "Updating user",
};

export var indexVolumeGroupMemberships: IndexVolumeGroupMembership[] = [
  { volumeId: "1", groupName: "Index volume group 01" },
  { volumeId: "2", groupName: "Index volume group 01" },
  { volumeId: "3", groupName: "Index volume group 02" },
];
