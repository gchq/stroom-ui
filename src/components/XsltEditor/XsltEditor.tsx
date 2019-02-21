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
import { useDispatch } from "redux-react-hook";

import DocRefEditor, { useDocRefEditor, actionCreators } from "../DocRefEditor";
import Loader from "../Loader";
import useApi from "./useXsltApi";
import ThemedAceEditor from "../ThemedAceEditor";
import { XsltDoc } from "../../types";

const { documentChangesMade } = actionCreators;

export interface Props {
  xsltUuid: string;
}

const XsltEditor = ({ xsltUuid }: Props) => {
  const api = useApi();
  const dispatch = useDispatch();
  useEffect(() => {
    api.fetchDocument(xsltUuid);
  });

  const { document, editorProps } = useDocRefEditor<XsltDoc>({
    docRefUuid: xsltUuid,
    saveDocument: api.saveDocument
  });

  if (!document) {
    return <Loader message="Loading XSLT..." />;
  }

  return (
    <DocRefEditor {...editorProps}>
      <ThemedAceEditor
        style={{ width: "100%", height: "100%", minHeight: "25rem" }}
        name={`${xsltUuid}-ace-editor`}
        mode="xml"
        value={document.data}
        onChange={newValue => {
          if (newValue !== document.data) {
            dispatch(documentChangesMade(xsltUuid, { data: newValue }));
          }
        }}
      />
    </DocRefEditor>
  );
};

export default XsltEditor;
