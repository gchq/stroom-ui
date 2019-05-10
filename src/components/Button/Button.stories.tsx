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

import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import Button from "./Button";

interface Variant {
  title: string;
  appearance: "default" | "outline" | "icon" | "contained";
}
const variants: Variant[] = [
  {
    title: "Default Buttons",
    appearance: "default",
  },
  {
    title: "Outline Buttons",
    appearance: "outline",
  },
  {
    title: "Icon Buttons",
    appearance: "icon",
  },
  {
    title: "Contained Buttons",
    appearance: "contained",
  },
];

const TestHarness: React.FunctionComponent = () => {
  return (
    <div>
      {variants.map(({ title, appearance }, i) => (
        <div key={i}>
          <h1>{title}</h1>
          <div className="button-container">
            <Button
              appearance={appearance}
              action="primary"
              icon="save"
              text="Save"
              title="Save"
            />
            <Button
              appearance={appearance}
              action="secondary"
              text="Close"
              icon="times"
              title="Close"
            />
            <Button
              appearance={appearance}
              icon="key"
              text="Permissions"
              title="Permissions"
            />
          </div>

          <div className="button-container">
            <Button
              appearance={appearance}
              action="primary"
              icon="save"
              text="Save"
              title="Save"
              selected={true}
            />
            <Button
              appearance={appearance}
              action="secondary"
              text="Close"
              icon="times"
              title="Close"
              selected={true}
            />
            <Button
              appearance={appearance}
              icon="key"
              text="Permissions"
              title="Permissions"
              selected={true}
            />
          </div>

          <div className="button-container">
            <Button
              appearance={appearance}
              action="primary"
              icon="save"
              text="Save"
              title="Save"
              disabled={true}
            />
            <Button
              appearance={appearance}
              action="secondary"
              text="Close"
              icon="times"
              title="Close"
              disabled={true}
            />
            <Button
              appearance={appearance}
              icon="key"
              text="Permissions"
              title="Permissions"
              disabled={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const stories = storiesOf("General Purpose/Button", module);

addThemedStories(stories, () => <TestHarness />, true);
