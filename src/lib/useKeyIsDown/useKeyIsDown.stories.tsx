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
import * as React from "react";
import { storiesOf } from "@storybook/react";

import useKeyIsDown, { DEFAULT_FILTERS } from "./useKeyIsDown";

import { KeyDownState } from "./types";

const TestHarness = () => {
  const keyIsDown1: KeyDownState = useKeyIsDown();
  const filters2: string[] = ["Control", "Alt"];
  const keyIsDown2: KeyDownState = useKeyIsDown(filters2);
  return (
    <div>
      <h3>Test Keys Down/Up (instance 1)</h3>

      <form>
        {DEFAULT_FILTERS.map(f => (
          <div key={f}>
            <label>{f}</label>
            <input type="checkbox" checked={keyIsDown1[f]} />
          </div>
        ))}
      </form>

      <h3>Test Keys Down/Up (instance 2)</h3>
      <form>
        {filters2.map(f => (
          <div key={f}>
            <label>{f}</label>
            <input type="checkbox" checked={keyIsDown2[f]} />
          </div>
        ))}
      </form>
    </div>
  );
};

storiesOf("Custom Hooks/useKeyIsDown", module).add(
  "Test Component",
  TestHarness,
);
