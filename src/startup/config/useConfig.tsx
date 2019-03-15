import { useEffect } from "react";

import useReduxState from "../../lib/useReduxState";
import { GlobalStoreState } from "../reducers";

import { useApi } from "./config";
import { useActionCreators } from "./redux";

export const useConfig = () => {
  const { fetchConfig } = useApi();
  const { updateConfig } = useActionCreators();

  useEffect(() => {
    fetchConfig().then(updateConfig);
  }, [fetchConfig]);

  // Get data from and subscribe to the store
  const config = useReduxState(({ config }: GlobalStoreState) => config);

  return config;
};

export default useConfig;
