import { ResourceBuilder } from "./types";

import appPermissionResource from "./appPermissionResource";
import documentPermissionResource from "./documentPermissionResource";
import dictionaryResource from "./dictionaryResource";
import elementsResource from "./elementsResource";
import explorerResource from "./explorerResource";
import indexResource from "./indexResource";
import indexVolumeGroupResource from "./indexVolumeGroupResource";
import indexVolumeResource from "./indexVolumeResource";
import pipelineResource from "./pipelineResource";
import streamAttributeMapResource from "./streamAttributeMapResource";
import streamTaskResource from "./streamTaskResource";
import userResource from "./userAndGroupsResource";
import xsltResource from "./xsltResource";

const resourceBuilders: Array<ResourceBuilder> = [
  appPermissionResource,
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
