import {
  DocRefTree,
  ElementDefinition,
  ElementPropertiesByElementIdType,
  DataSourceType,
  StreamTaskType,
  StroomUser,
  IndexVolume,
  IndexVolumeGroup,
  IndexVolumeGroupMembership,
  StreamAttributeMapResult,
  DocumentType,
} from "../types";
import { ResourcesByDocType } from "src/api/useDocumentApi/types";
import { User } from "src/components/users";

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
  docRefTypes: string[];
  documentTree: DocRefTree;
  elements: ElementDefinition[];
  elementProperties: ElementPropertiesByElementIdType;
  documents: {
    [docRefType in keyof ResourcesByDocType]: DocumentType<docRefType>[]
  };
  trackers: StreamTaskType[];
  dataList: StreamAttributeMapResult;
  dataSource: DataSourceType;
  usersAndGroups: {
    users: StroomUser[];
    userGroupMemberships: UserGroupMembership[];
  };
  indexVolumesAndGroups: {
    volumes: IndexVolume[];
    groups: IndexVolumeGroup[];
    groupMemberships: IndexVolumeGroupMembership[];
  };
  allAppPermissions: string[];
  userAppPermissions: {
    [userUuid: string]: string[];
  };
  docPermissionByType: {
    [docType: string]: string[];
  };
  users: User[];
  userDocPermission: UserDocPermission[];
}
