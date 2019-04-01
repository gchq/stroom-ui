import {
  DocRefTree,
  ElementDefinitions,
  ElementPropertiesByElementIdType,
  DataSourceType,
  StreamTaskType,
  User,
  IndexVolume,
  IndexVolumeGroup,
  IndexVolumeGroupMembership,
  StreamAttributeMapResult,
  DocumentType
} from "../types";
import { ResourcesByDocType } from "src/api/useDocumentApi/types";

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
  docRefTypes: Array<string>;
  documentTree: DocRefTree;
  elements: ElementDefinitions;
  elementProperties: ElementPropertiesByElementIdType;
  documents: {
    [docRefType in keyof ResourcesByDocType]: Array<DocumentType<docRefType>>
  };
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
