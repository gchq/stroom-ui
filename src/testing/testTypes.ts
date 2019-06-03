import { StroomUser } from "components/AuthorisationManager/api/userGroups";
import { StreamAttributeMapResult } from "components/MetaBrowser/types";
import {
  ElementDefinition,
  ElementPropertiesByElementIdType,
} from "components/DocumentEditors/PipelineEditor/useElements/types";
import {
  DocRefTree,
  DocumentBase,
} from "components/DocumentEditors/useDocumentApi/types/base";
import { ResourcesByDocType } from "components/DocumentEditors/useDocumentApi/types/resourceUrls";
import { DataSourceType } from "components/ExpressionBuilder/types";
import {
  IndexVolumeGroup,
  IndexVolumeGroupMembership,
} from "components/IndexVolumeGroups/api";
import { IndexVolume } from "components/IndexVolumes/api";
import { StreamTaskType } from "components/Processing/types";
import { User } from "components/users/types";
import { Activity, ActivityConfig } from "components/Activity/api/types";

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
  activity: {
    config: ActivityConfig;
    activityList: Activity[];
    currentActivityId: string;
  };
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
