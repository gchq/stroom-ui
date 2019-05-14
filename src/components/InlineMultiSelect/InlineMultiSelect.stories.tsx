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

import { storiesOf } from "@storybook/react";
import { SelectOption } from "components/InlineSelect/InlineSelect";
import * as React from "react";
import { addThemedStories } from "testing/storybook/themedStoryGenerator";
import InlineMultiSelect from "./InlineMultiSelect";

const stories = storiesOf("General Purpose/InlineMultiSelect", module);

const options: SelectOption[] = [
  { value: "leia", label: "Princess Leia" },
  { value: "han", label: "Han Solo" },
  { value: "jabba", label: "Jabba the Hut" },
  { value: "luke", label: "Luke Skywalker" },
  { value: "everyone", label: "everyone" },
];

addThemedStories(stories, () => (
  <div style={{padding:"5em"}}>
    <h1>InlineMultiSelect</h1>
    <p>An edit-in-place multi<code>select</code>, to be used inline with text. 
    Allows the selection of multiple options.</p>
    <form>

      <h2>Empty</h2>
      <span>I would like to feed </span>
      <InlineMultiSelect options={options} selected={[]}/>
      <span> to the sarlacc.</span>
      
      <h2>Single selection</h2>
      <span>I would like to feed </span>
      <InlineMultiSelect options={options} selected={["leia"]}/>
      <span> to the sarlacc.</span>

      <h2>Multiple selection</h2>
      <span>I would like to feed </span>
      <InlineMultiSelect options={options} selected={["leia", "han", "luke"]}/>
      <span> to the sarlacc.</span>

      <h2>Same thing selected more than one</h2>
      <span>I would like to feed </span>
      <InlineMultiSelect options={options} selected={["leia", "han", "leia"]}/>
      <span> to the sarlacc.</span>

    </form>
  </div>
));
