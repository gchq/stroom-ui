import { StroomUser } from "src/components/AuthorisationManager/api/userGroups";
import { StreamAttributeMapResult } from "src/components/DataViewer/types";
import {
  ElementDefinition,
  ElementPropertiesByElementIdType,
} from "src/components/DocumentEditors/PipelineEditor/useElements/types";
import {
  DocRefTree,
  DocumentBase,
} from "src/components/DocumentEditors/useDocumentApi/types/base";
import { ResourcesByDocType } from "src/components/DocumentEditors/useDocumentApi/types/resourceUrls";
import { DataSourceType } from "src/components/ExpressionBuilder/types";
import {
  IndexVolumeGroup,
  IndexVolumeGroupMembership,
} from "src/components/IndexVolumeGroups/api";
import { IndexVolume } from "src/components/IndexVolumes/api";
import { StreamTaskType } from "src/components/Processing/types";
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
