import { useCallback } from "react";

import useHttpClient from "../useHttpClient";
import {
  ElementDefinitions,
  ElementPropertiesByElementIdType,
} from "../../types";
import { useConfig } from "../../startup/config";

interface Api {
  fetchElements: () => Promise<ElementDefinitions>;
  fetchElementProperties: () => Promise<ElementPropertiesByElementIdType>;
}

export const useApi = (): Api => {
  const { stroomBaseServiceUrl } = useConfig();
  const { httpGetJson } = useHttpClient();

  const fetchElements = useCallback(
    () =>
      httpGetJson(`${stroomBaseServiceUrl}/elements/v1/elements`, {}, false),
    [stroomBaseServiceUrl, httpGetJson],
  );
  const fetchElementProperties = useCallback(
    () =>
      httpGetJson(
        `${stroomBaseServiceUrl}/elements/v1/elementProperties`,
        {},
        false,
      ),
    [stroomBaseServiceUrl, httpGetJson],
  );

  return {
    fetchElementProperties,
    fetchElements,
  };
};

export default useApi;
