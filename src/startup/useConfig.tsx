import { useCallback, useEffect } from "react";
import { useMappedState } from "redux-react-hook";

import { GlobalStoreState } from "./reducers";

import { useFetchConfig } from "./config";

export const useConfig = () => {
  const fetchConfig = useFetchConfig();

  useEffect(() => {
    fetchConfig();
  }, []);

  const mapState = useCallback(
    ({ config }: GlobalStoreState) => ({
      config
    }),
    []
  );

  // Get data from and subscribe to the store
  const { config } = useMappedState(mapState);

  return config;
};

export default useConfig;
