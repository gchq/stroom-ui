import { ResourceBuilder } from "./types";

import authenticationResource from "./authenticationResource";
import authorisationResource from "./authorisationResource";
import appPermissionResource from "./appPermissionResource";
import documentPermissionResource from "./documentPermissionResource";
import elementsResource from "./elementsResource";
import explorerResource from "./explorerResource";
import indexVolumeGroupResource from "./indexVolumeGroupResource";
import indexVolumeResource from "./indexVolumeResource";
import pipelineResource from "./pipelineResource";
import streamAttributeMapResource from "./streamAttributeMapResource";
import streamTaskResource from "./streamTaskResource";
import userResource from "./userAndGroupsResource";
import documentResources from "./documentResources";

const resourceBuilders: ResourceBuilder[] = [
  appPermissionResource,
  authenticationResource,
  authorisationResource,
  documentPermissionResource,
  documentResources,
  elementsResource,
  explorerResource,
  indexVolumeGroupResource,
  indexVolumeResource,
  pipelineResource,
  streamAttributeMapResource,
  streamTaskResource,
  userResource,
];

export default resourceBuilders;
