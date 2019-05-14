import * as React from "react";
import useHttpClient from "lib/useHttpClient";
import useConfig from "startup/config/useConfig";
import { Activity } from "./types";

interface UseApi {
  getActivity: () => Promise<Activity>;
}

const useApi = (): UseApi => {
  const { httpGetJson } = useHttpClient();
  const { stroomBaseServiceUrl } = useConfig();
  return {
    getActivity: React.useCallback(
      () => httpGetJson(`${stroomBaseServiceUrl}/activity`),
      [httpGetJson, stroomBaseServiceUrl],
    ),
  };
};

export default useApi;
