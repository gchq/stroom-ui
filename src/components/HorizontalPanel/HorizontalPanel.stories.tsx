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
import { loremIpsum } from "lorem-ipsum";
import { storiesOf } from "@storybook/react";

import HorizontalPanel from "./HorizontalPanel";

const EnabledCheckbox = () => (
  <label>
    <input type="checkbox" name="checkbox" value="value" />
    &nbsp;Enabled?
  </label>
);

// TODO some properties that don't seem to exist on the component?

storiesOf("General Purpose/Horizontal Panel", module)
  .add("div content", () => (
    <HorizontalPanel
      title="Some title"
      onClose={() => console.log("closed")}
      content={<div>{loremIpsum({ count: 100, units: "words" })}</div>}
      headerMenuItems={<EnabledCheckbox />}
    />
  ))
  .add("long title", () => (
    <HorizontalPanel
      title="Some very, very long title"
      onClose={() => console.log("closed")}
      content={<div>{loremIpsum({ count: 100, units: "words" })}</div>}
      headerMenuItems={<EnabledCheckbox />}
    />
  ))
  .add("long title with adjusted columns", () => (
    <HorizontalPanel
      title="Some very, very long title"
      onClose={() => console.log("closed")}
      content={<div>{loremIpsum({ count: 100, units: "words" })}</div>}
      headerMenuItems={<EnabledCheckbox />}
      //titleColumns="8"
      //menuColumns="8"
    />
  ))
  .add("With different sized header", () => (
    <HorizontalPanel
      title="A smaller header"
      onClose={() => console.log("closed")}
      content={<div>{loremIpsum({ count: 100, units: "words" })}</div>}
      headerMenuItems={<EnabledCheckbox />}
      //headerSize="h4"
    />
  ))
  .add("with lots of content", () => (
    <HorizontalPanel
      title="A smaller header"
      onClose={() => console.log("closed")}
      content={<div>{loremIpsum({ count: 6000, units: "words" })}</div>}
      headerMenuItems={<EnabledCheckbox />}
      //headerSize="h4"
    />
  ));
