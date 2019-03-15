import { useCallback } from "react";

import useHttpClient from "../useHttpClient";
import {
  ElementDefinitions,
  ElementPropertiesByElementIdType
} from "../../types";
import useGetStroomBaseServiceUrl from "../useGetStroomBaseServiceUrl";

interface Api {
  fetchElements: () => Promise<ElementDefinitions>;
  fetchElementProperties: () => Promise<ElementPropertiesByElementIdType>;
}

export const useApi = (): Api => {
  const getStroomBaseServiceUrl = useGetStroomBaseServiceUrl();
  const { httpGetJson } = useHttpClient();

  const fetchElements = useCallback(
    () =>
      httpGetJson(
        `${getStroomBaseServiceUrl()}/elements/v1/elements`,
        {},
        false
      ),
    [getStroomBaseServiceUrl, httpGetJson]
  );
  const fetchElementProperties = useCallback(
    () =>
      httpGetJson(
        `${getStroomBaseServiceUrl()}/elements/v1/elementProperties`,
        {},
        false
      ),
    [getStroomBaseServiceUrl, httpGetJson]
  );

  return {
    fetchElementProperties,
    fetchElements
  };
};

export default useApi;
