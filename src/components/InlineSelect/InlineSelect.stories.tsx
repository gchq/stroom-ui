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

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import InlineSelect, { SelectOption } from "./InlineSelect";

const stories = storiesOf("General Purpose/InlineSelect", module);

const options: SelectOption[] = [
  { value: "leia", label: "Princess Leia" },
  { value: "han", label: "Han Solo" },
  { value: "jabba", label: "Jabba the Hut" },
  { value: "luke", label: "Luke Skywalker" },
  { value: "everyone", label: "everyone" },
];

const simpleOptions: string[] = [
  "leia",
  "han",
  "jabba",
  "luke",
  "everyone"
]

addThemedStories(stories, () => (
  <div style={{ padding: "5em" }}>
    <h1>InlineSelect</h1>
    <p>An edit-in-place <code>select</code>, to be used inline with text.</p>
    <form>

      <h2>Simplest</h2>
      <span>I would like to feed </span>
      <InlineSelect options={options} />
      <span> to the sarlacc.</span>

      <h2>With an existing value</h2>
      <span>I would like to feed </span>
      <InlineSelect options={options} selected="everyone" />
      <span> to the sarlacc.</span>

      <h2>With an onChange handler (see Action addon)</h2>
      <span>I would like to feed </span>
      <InlineSelect options={options} onChange={action("onChange")} />
      <span> to the sarlacc.</span>

      <h2>With a placeholder</h2>
      <span>I would like to feed </span>
      <InlineSelect options={options} placeholder="+" onChange={action("onChange")} />
      <span> to the sarlacc.</span>

      <h2>With simple options, i.e. not value/label pairs but just values</h2>
      <span>I would like to feed </span>
      <InlineSelect simpleOptions={simpleOptions} onChange={action("onChange")} />
      <span> to the sarlacc.</span>

    </form>
  </div>
));
