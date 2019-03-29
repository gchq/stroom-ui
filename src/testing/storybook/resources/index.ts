import { ResourceBuilder } from "./types";

import authenticationResource from "./authenticationResource";
import authorisationResource from "./authorisationResource";
import appPermissionResource from "./appPermissionResource";
import documentPermissionResource from "./documentPermissionResource";
import dictionaryResource from "./documents/dictionaryResource";
import elementsResource from "./elementsResource";
import explorerResource from "./explorerResource";
import indexResource from "./documents/indexResource";
import indexVolumeGroupResource from "./indexVolumeGroupResource";
import indexVolumeResource from "./indexVolumeResource";
import pipelineResource from "./pipelineResource";
import streamAttributeMapResource from "./streamAttributeMapResource";
import streamTaskResource from "./streamTaskResource";
import userResource from "./userAndGroupsResource";
import xsltResource from "./documents/xsltResource";

const resourceBuilders: Array<ResourceBuilder> = [
  appPermissionResource,
  authenticationResource,
  authorisationResource,
  documentPermissionResource,
  dictionaryResource,
  elementsResource,
  explorerResource,
  indexResource,
  indexVolumeGroupResource,
  indexVolumeResource,
  pipelineResource,
  streamAttributeMapResource,
  streamTaskResource,
  userResource,
  xsltResource
];

export default resourceBuilders;
