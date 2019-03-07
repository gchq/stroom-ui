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

import StroomDecorator from "../../../testing/storybook/StroomDecorator";
import fullTestData from "../../../testing/data";
import { addThemedStories } from "../../../lib/themedStoryGenerator";

import "../../../styles/main.css";
import DocumentPermissionEditor from "./DocumentPermissionEditor";

const testDocRef = fullTestData.documentTree.children![0].children![0];

const stories = storiesOf(
  "Sections/Authorisation Manager/Document Permission Editor",
  module
).addDecorator(StroomDecorator);

addThemedStories(stories, <DocumentPermissionEditor docRef={testDocRef} />);
