import { useEffect } from "react";

import useReduxState from "../lib/useReduxState/useReduxState";
import { GlobalStoreState } from "./reducers";

import { useFetchConfig } from "./config";

export const useConfig = () => {
  const fetchConfig = useFetchConfig();

  useEffect(() => {
    fetchConfig();
  }, []);

  // Get data from and subscribe to the store
  const { config } = useReduxState(({ config }: GlobalStoreState) => ({
    config
  }));

  return config;
};

export default useConfig;
