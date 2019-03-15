/*
 * Copyright 2018 Crown Copyright
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
import useHttpClient from "../../api/useHttpClient";
import { useContext, useCallback } from "react";
import { StoreContext } from "redux-react-hook";
import { Config } from "./types";

interface Api {
  fetchConfig: () => Promise<Config>;
}

const useApi = (): Api => {
  const store = useContext(StoreContext);
  const { httpGetJson } = useHttpClient();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const fetchConfig = useCallback(() => {
    return httpGetJson("/config.json", {}, false);
  }, [httpGetJson]);

  return { fetchConfig };
};

export { Api, useApi };
