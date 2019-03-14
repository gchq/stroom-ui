import { useCallback } from "react";
import useStroomBaseUrl from "../useStroomBaseUrl";

import useHttpClient from "../useHttpClient";
import {
  ElementDefinitions,
  ElementPropertiesByElementIdType
} from "../../types";

interface Api {
  fetchElements: () => Promise<ElementDefinitions>;
  fetchElementProperties: () => Promise<ElementPropertiesByElementIdType>;
}

export const useApi = (): Api => {
  const stroomBaseServiceUrl = useStroomBaseUrl();
  const { httpGetJson } = useHttpClient();

  const fetchElements = useCallback(() => {
    const state = store.getState();
    const url = `${stroomBaseServiceUrl}/elements/v1/elements`;
    return httpGetJson(url, {}, false);
  }, [httpGetJson]);
  const fetchElementProperties = useCallback(() => {
    const state = store.getState();
    const url = `${stroomBaseServiceUrl}/elements/v1/elementProperties`;
    return httpGetJson(url, {}, false);
  }, [httpGetJson]);

  return {
    fetchElementProperties,
    fetchElements
  };
};

export default useApi;
