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
import { Polly } from "@pollyjs/core";
import FetchAdapter, {
  HttpRequest,
  HttpResponse,
} from "@pollyjs/adapter-fetch";

import { useHttpClient } from "lib/useHttpClient";
import { Config } from "startup/config/types";
import { TestData } from "../testTypes";

import resources from "./resources";
import * as React from "react";

// Register the fetch adapter so its accessible by all future polly instances
Polly.register(FetchAdapter);

const testConfig: Config = {
  advertisedUrl: "/",
  allowPasswordResets: true,
  clientId: "stroom-ui",
  stroomBaseServiceUrl: "http://localhost:9001",
  stroomUiUrl: "http://localhost:8080/stroom",
};

// The server is created as a singular thing for the whole app
// Much easier to manage it this way
const polly = new Polly("Mock Stroom API");
polly.configure({
  adapters: ["fetch", FetchAdapter],
  logging: true,
});
const { server } = polly;

// The cache acts as a singular global object who's contents are replaced
export interface TestCache {
  data?: TestData;
}

const testCache: TestCache = {};

// Hot loading should pass through
server.get("*.hot-update.json").passthrough();

// This is normally deployed as part of the server
server.get("/config.json").intercept((req: HttpRequest, res: HttpResponse) => {
  res.json(testConfig);
});

// Build all the resources
resources.forEach(r => r(server, testConfig, testCache));

export interface Props {
  testData: TestData;
}

export const useTestServer = (testData: TestData) => {
  const { clearCache } = useHttpClient();

  React.useEffect(() => {
    clearCache();
    // Make a deep copy so that each test gets it's own data
    testCache.data = JSON.parse(JSON.stringify(testData));
  }, [testData, clearCache]);
};
