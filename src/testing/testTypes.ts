import { ResourcesByDocType } from "src/api/useDocumentApi";
import { DocRefTree, DocumentBase } from "src/api/useDocumentApi/types/base";
import {
  ElementDefinition,
  ElementPropertiesByElementIdType,
} from "src/api/useElements/types";
import { DataSourceType } from "src/components/ExpressionBuilder/types";
import { User } from "src/components/users";
import {
  IndexVolume,
  IndexVolumeGroup,
  IndexVolumeGroupMembership,
  StreamAttributeMapResult,
  StreamTaskType,
} from "src/types";
import { StroomUser } from "src/api/userGroups";

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
    [docRefType in keyof ResourcesByDocType]: DocumentBase<docRefType>[]
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
