import { useEffect } from "react";

import useReduxState from "../../lib/useReduxState";
import { GlobalStoreState } from "../reducers";

import { useApi } from "./config";

export const useConfig = () => {
  const { fetchConfig } = useApi();

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  // Get data from and subscribe to the store
  const config = useReduxState(({ config }: GlobalStoreState) => config);

  return config;
};

export default useConfig;
