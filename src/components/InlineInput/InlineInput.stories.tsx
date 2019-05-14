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
import InlineInput from "./InlineInput";

const stories = storiesOf("General Purpose/InlineInput", module);

addThemedStories(stories, () => 
  <div style={{padding:"5em"}}>
    <h1>InlineInput</h1>
    <p>An edit-in-place <code>input</code>, to be used inline with text.</p>
    <p>Controls when editing are:</p>
    <ul>
      <li><code>esc</code>: discard the change and close <code>input</code> </li>
      <li><code>enter</code>: keep the change and close <code>input</code> </li>
      <li><code>blur</code> the component: keep the change and close <code>input</code> </li>
    </ul>
    <form>

      <h2>Simplest</h2>
      <span>I would like to feed </span>
      <InlineInput/>
      <span> to the sarlacc.</span>

      <h2>With an existing value</h2>
      <span>I would like to feed </span>
      <InlineInput value="Yoda" />
      <span> to the sarlacc.</span>

      <h2>With an onChange handler (see Action addon)</h2>
      <span>I would like to feed </span>
      <InlineInput onChange={action("onChange")} />
      <span> to the sarlacc.</span>

    </form>
  </div>
 );