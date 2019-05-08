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
    title: "Default Buttons (default)",
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
          <Button
            appearance={appearance}
            icon="key"
            text="Disabled"
            title="Disabled"
            disabled={true}
          />
          <Button
            appearance={appearance}
            icon="key"
            text="Selected"
            title="Selected"
            selected={true}
          />
        </div>
      ))}
    </div>
  );
};

const stories = storiesOf("General Purpose/Button", module);

// storiesOf("New Developer/Step 4", module).add("all", () => <TestHarness />);

stories.add("Button Appeearance", () => <TestHarness />);

// stories.add("button group - icon and text", () => (
//   <div className="page__buttons">
//     <Button
//       icon="angle-up"
//       text="Button 1"
//     />
//     <Button
//       action="primary"
//       icon="angle-up"
//       text="Button 2"
//     />
//     <Button
//       action="secondary"
//       icon="angle-up"
//       text="Button 3"
//     />
//   </div>
// ));

// stories.add("button group - text only", () => (
//   <div className="page__buttons">
//     <Button text="Button 1" />
//     <Button action="primary" text="Button 2" />
//     <Button action="secondary" text="Button 3" />
//   </div>
// ));

// stories.add("icon and text", () => (
//   <Button action="primary" text="Permissions" icon="key" />
// ));

// stories.add("just text", () => <Button action="primary" text="Button text" />);

// stories.add("just icon", () => (
//   <Button appearance="icon" icon="trash" />
// ));

// stories.add("selected - icon and text", () => (
//   <Button
//     className="raised-low"
//     appearance="icon"
//     icon="angle-up"
//     text="Button text"
//   />
// ));

// stories.add("disabled", () => (
//   <div className="page__buttons">
//     <Button className="raised-low" disabled icon="trash" />
//     <Button
//       className="raised-low"
//       appearance="icon"
//       disabled
//       icon="trash"
//     />
//     <Button className="raised-low" disabled text="Button text" />
//     <Button
//       className="raised-low"
//       disabled
//       selected
//       icon="angle-up"
//       text="Button text"
//     />
//   </div>
// ));

// stories.add("many buttons", () => (
//   <div className="page__buttons">
//     <Button className="raised-low" text="Button 1" />
//     <Button className="raised-low" text="Button 2" />
//     <Button className="raised-low" text="Button 3" />

//     <Button
//       className="raised-low"
//       appearance={ButtonAppearance.Icon}
//       icon="trash"
//     />

//     <Button
//       className="raised-low"
//       selected
//       icon="angle-up"
//       text="A selected button"
//     />

//     <Button className="raised-low" icon="angle-up" />
//     <Button className="raised-low" icon="angle-up" />
//     <Button className="raised-low" icon="angle-up" />

//     <Button className="raised-low" icon="angle-up" />
//     <Button className="raised-low" icon="angle-up" />
//     <Button className="raised-low" icon="angle-up" />

//     <Button className="raised-low" icon="trash" />

//     <Button className="raised-low" icon="trash" />
//   </div>
// ));

addThemedStories(stories, () => <TestHarness />, true);
