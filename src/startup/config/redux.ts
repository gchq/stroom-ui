import { Action } from "redux";
import {
  prepareReducer,
  genUseActionCreators
} from "../../lib/redux-actions-ts";
import { Config } from "./types";

const initialState = { values: {}, isReady: false };

const UPDATE_CONFIG = "UPDATE_CONFIG";

interface UpdateConfigAction extends Action<"UPDATE_CONFIG"> {
  values: Config;
}

export const useActionCreators = genUseActionCreators({
  updateConfig: (values: Config): UpdateConfigAction => ({
    type: UPDATE_CONFIG,
    values
  })
});

export const reducer = prepareReducer(initialState)
  .handleAction<UpdateConfigAction>(UPDATE_CONFIG, (_, { values }) => ({
    isReady: true,
    values: values
  }))
  .getReducer();
