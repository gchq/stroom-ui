import {
  DocRefTree,
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
  StreamAttributeMapResult,
  AnnotationsIndexDoc,
  DashboardDoc,
  ElasticIndexDoc,
  FeedDoc,
  ScriptDoc,
  StatisticsStoreDoc,
  StroomStatsStoreDoc,
  VisualisationDoc,
  XMLSchemaDoc
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
  docRefTypes: Array<string>;
  documentTree: DocRefTree;
  pipelines: Array<PipelineModelType>;
  elements: ElementDefinitions;
  elementProperties: ElementPropertiesByElementIdType;
  xslt: Array<XsltDoc>;
  dictionaries: Array<Dictionary>;
  indexes: Array<IndexDoc>;
  annotationIndexes: Array<AnnotationsIndexDoc>;
  dashboards: Array<DashboardDoc>;
  elasticIndexes: Array<ElasticIndexDoc>;
  feeds: Array<FeedDoc>;
  scripts: Array<ScriptDoc>;
  statisticsStores: Array<StatisticsStoreDoc>;
  stroomStatsStores: Array<StroomStatsStoreDoc>;
  visualisations: Array<VisualisationDoc>;
  xmlSchemas: Array<XMLSchemaDoc>;
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
