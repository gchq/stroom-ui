import { ElementDefinitions, ElementPropertiesByElementIdType } from "../../types";

export interface StoreState {
  elementDefinitions: ElementDefinitions;
  elementProperties: ElementPropertiesByElementIdType;
}