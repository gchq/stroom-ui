import { StateById } from "../../lib/redux-actions-ts";

export interface StoreStateById {
  pipelineId?: string;
}

export interface StoreState extends StateById<StoreStateById> {}
