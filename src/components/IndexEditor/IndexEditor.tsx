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
import { useEffect } from "react";

import DocRefEditor, { useDocRefEditor } from "../DocRefEditor";
import Loader from "../Loader";
import useIndexApi from "./useIndexApi";
import { IndexDoc } from "../../types";
import IndexFieldsTable, {
  useTable as useFieldsTable
} from "./IndexFieldsTable";

export interface Props {
  indexUuid: string;
}

const IndexEditor = ({ indexUuid }: Props) => {
  const indexApi = useIndexApi();

  useEffect(() => {
    indexApi.fetchDocument(indexUuid);
  }, []);

  const { document, editorProps } = useDocRefEditor<IndexDoc>({
    docRefUuid: indexUuid,
    saveDocument: indexApi.saveDocument
  });

  const { componentProps } = useFieldsTable(
    document && document.data ? document.data.fields : []
  );

  if (!document) {
    return <Loader message="Loading Index..." />;
  }

  return (
    <DocRefEditor {...editorProps}>
      <h2>Fields</h2>
      <IndexFieldsTable {...componentProps} />
    </DocRefEditor>
  );
};

export default IndexEditor;
