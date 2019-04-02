import * as React from "react";

import useHttpClient from "src/lib/useHttpClient";
import {
  ElementDefinitions,
  ElementPropertiesByElementIdType,
} from "src/types";
import { useConfig } from "src/startup/config";

interface Api {
  fetchElements: () => Promise<ElementDefinitions>;
  fetchElementProperties: () => Promise<ElementPropertiesByElementIdType>;
}

export const useApi = (): Api => {
  const { stroomBaseServiceUrl } = useConfig();
  const { httpGetJson } = useHttpClient();

  const fetchElements = React.useCallback(
    () =>
      httpGetJson(`${stroomBaseServiceUrl}/elements/v1/elements`, {}, false),
    [stroomBaseServiceUrl, httpGetJson],
  );
  const fetchElementProperties = React.useCallback(
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
