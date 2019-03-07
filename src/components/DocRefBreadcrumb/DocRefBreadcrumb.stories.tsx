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
import { useState } from "react";

import { storiesOf } from "@storybook/react";

import StroomDecorator from "../../testing/storybook/StroomDecorator";
import DocRefBreadcrumb from "./DocRefBreadcrumb";
import fullTestData from "../../testing/data";

import { DocRefType } from "../../types";

import "../../styles/main.css";
import JsonDebug from "../../testing/JsonDebug";
import { findItem } from "../../lib/treeUtils";
import { addThemedStories } from "../../lib/themedStoryGenerator";

const testDocRef = fullTestData.documentTree.children![0].children![0];

const testDocRefWithLineage = findItem(
  fullTestData.documentTree,
  testDocRef.uuid
)!;

const BreadcrumbOpen = () => {
  const [openDocRef, setOpenDocRef] = useState<DocRefType | undefined>(
    undefined
  );

  return (
    <div>
      <div>Doc Ref Breadcrumb</div>
      <DocRefBreadcrumb
        docRefWithLineage={testDocRefWithLineage}
        openDocRef={setOpenDocRef}
      />
      <JsonDebug currentValues={openDocRef} />
    </div>
  );
};

const stories = storiesOf("Doc Ref/Breadcrumb", module).addDecorator(
  StroomDecorator
);

addThemedStories(stories, <BreadcrumbOpen />);
