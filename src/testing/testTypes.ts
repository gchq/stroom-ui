import {
  DocRefTree,
  DocRefTypeList,
  PipelineModelType,
  ElementDefinitions,
  ElementPropertiesByElementIdType,
  Dictionary,
  DataSourceType,
  StreamTaskType,
  User,
  IndexVolume,
  IndexVolumeGroup,
  IndexVolumeGroupMembership,
  IndexDoc,
  XsltDoc,
  StreamAttributeMapResult
} from "../types";

export interface UserGroupMembership {
  userUuid: string;
  groupUuid: string;
}

export interface UserDocPermission {
  userUuid: string;
  docRefUuid: string;
  permissionName: string;
}

export interface TestData {
  docRefTypes: DocRefTypeList;
  documentTree: DocRefTree;
  pipelines: Array<PipelineModelType>;
  elements: ElementDefinitions;
  elementProperties: ElementPropertiesByElementIdType;
  xslt: Array<XsltDoc>;
  dictionaries: Array<Dictionary>;
  indexes: Array<IndexDoc>;
  trackers: Array<StreamTaskType>;
  dataList: StreamAttributeMapResult;
  dataSource: DataSourceType;
  usersAndGroups: {
    users: Array<User>;
    userGroupMemberships: Array<UserGroupMembership>;
  };
  indexVolumesAndGroups: {
    volumes: Array<IndexVolume>;
    groups: Array<IndexVolumeGroup>;
    groupMemberships: Array<IndexVolumeGroupMembership>;
  };
  allAppPermissions: Array<string>;
  userAppPermissions: {
    [userUuid: string]: Array<string>;
  };
  docPermissionByType: {
    [docType: string]: Array<string>;
  };
  userDocPermission: Array<UserDocPermission>;
}