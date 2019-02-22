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
import { useSelectableReactTable } from "../../lib/useSelectableItemListing";
import { IndexField, IndexDoc } from "../../types";
import ReactTable from "react-table";

export interface Props {
  indexUuid: string;
}

const FIELD_COLUMNS = [
  {
    id: "name",
    Header: "Name",
    accessor: (u: IndexField) => u.name
  }
];

const IndexEditor = ({ indexUuid }: Props) => {
  const indexApi = useIndexApi();

  useEffect(() => {
    indexApi.fetchDocument(indexUuid);
  }, []);

  const { document, editorProps } = useDocRefEditor<IndexDoc>({
    docRefUuid: indexUuid,
    saveDocument: indexApi.saveDocument
  });

  const { tableProps } = useSelectableReactTable<IndexField>(
    {
      items: document && document.data ? document.data.fields : [],
      getKey: f => f.name
    },
    {
      columns: FIELD_COLUMNS
    }
  );

  if (!document) {
    return <Loader message="Loading Index..." />;
  }

  return (
    <DocRefEditor {...editorProps}>
      <h2>Fields</h2>
      <ReactTable {...tableProps} />
    </DocRefEditor>
  );
};

export default IndexEditor;
