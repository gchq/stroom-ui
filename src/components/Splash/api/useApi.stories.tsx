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

import * as React from "react";

import { storiesOf } from "@storybook/react";

import useApi from "./useApi";
import JsonDebug from "testing/JsonDebug";
import { SplashConfig } from "./types";

const SplashTestHarnessResource: React.FunctionComponent = () => {
  // REST call promise
  const { getConfig } = useApi();

  const [config, setConfig] = React.useState<SplashConfig>(undefined);
  React.useEffect(() => {
    getConfig().then(setConfig);
  }, [getConfig, setConfig]);
  return (
    <div>
      <JsonDebug value={{ config }} />
    </div>
  );
};

storiesOf("Sections/Splash/useApi", module).add("test", () => (
  <div>
    <SplashTestHarnessResource />
  </div>
));
