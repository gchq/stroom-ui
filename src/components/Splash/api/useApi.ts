/*
 * Copyright 2019 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useCallback } from "react";
import useHttpClient from "lib/useHttpClient";
import useConfig from "startup/config/useConfig";
import { SplashConfig } from "./types";

interface UseApi {
  getConfig: () => Promise<SplashConfig>;
  acknowledgeSplash: (message: string, version: string) => Promise<boolean>;
}

const useApi = (): UseApi => {
  const { httpGetJson, httpPostJsonResponse } = useHttpClient();
  const { stroomBaseServiceUrl } = useConfig();
  const resource = `${stroomBaseServiceUrl}/splash/v1`;

  return {
    getConfig: useCallback(() => httpGetJson(resource), [
      resource,
      httpGetJson,
    ]),

    acknowledgeSplash: useCallback(
      (message: string, version: string) => {
        return httpPostJsonResponse(resource, {
          body: JSON.stringify({
            message,
            version,
          }),
        });
      },
      [resource, httpPostJsonResponse],
    ),
  };
};

export default useApi;
