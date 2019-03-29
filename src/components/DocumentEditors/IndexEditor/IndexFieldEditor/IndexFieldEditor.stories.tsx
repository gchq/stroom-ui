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
import { useState, useMemo, useCallback } from "react";
import { storiesOf } from "@storybook/react";

import { addThemedStories } from "../../../../testing/storybook/themedStoryGenerator";

import IndexFieldEditor, { useEditor } from "./IndexFieldEditor";
import { generateTestField } from "../../../../testing/data/indexDocs";
import { IndexField } from "../../../../types";
import Button from "../../../Button";
import JsonDebug from "../../../../testing/JsonDebug";

const stories = storiesOf("Document Editors/Index/Field Editor", module);

const FIELD_ID = 1007;

const B: React.FunctionComponent = () => {
  const testField = useMemo(generateTestField, []);
  const [indexField, setIndexField] = useState<IndexField>(testField);
  const [lastId, setLastId] = useState<number>(0);
  const { componentProps, showEditor } = useEditor((_id, _indexField) => {
    setLastId(_id);
    setIndexField(_indexField);
  });

  const onClick = useCallback(() => {
    showEditor(FIELD_ID, indexField);
  }, [showEditor, indexField]);

  return (
    <div>
      <h2>Index Field Editor</h2>
      <Button text="Edit" onClick={onClick} />
      <IndexFieldEditor {...componentProps} />
      <JsonDebug value={{ FIELD_ID, lastId, indexField }} />
    </div>
  );
};

addThemedStories(stories, () => <B />);
