import { useEffect } from "react";

import useReduxState from "../lib/useReduxState/useReduxState";
import { GlobalStoreState } from "./reducers";

import { useApi } from "./config";

export const useConfig = () => {
  const api = useApi();

  useEffect(() => {
    api.fetchConfig();
  }, []);

  // Get data from and subscribe to the store
  const config = useReduxState(({ config }: GlobalStoreState) => config);

  return config;
};

export default useConfig;
