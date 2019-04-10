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

import DocRefEditor, {
  useDocRefEditor,
  SwitchedDocRefEditorProps,
} from "../DocRefEditor";
import Loader from "../../Loader";
import useDocumentApi from "src/api/useDocumentApi";
import ThemedAceEditor from "../../ThemedAceEditor";
import { XsltDoc } from "src/api/useDocumentApi/types/xsltDoc";

const XsltEditor: React.FunctionComponent<SwitchedDocRefEditorProps> = ({
  docRefUuid,
}) => {
  const documentApi = useDocumentApi<"XSLT", XsltDoc>("XSLT");

  const { onDocumentChange, editorProps } = useDocRefEditor<XsltDoc>({
    docRefUuid,
    documentApi,
  });

  const { docRefContents } = editorProps;

  return !!docRefContents ? (
    <DocRefEditor {...editorProps}>
      <ThemedAceEditor
        style={{ width: "100%", height: "100%", minHeight: "25rem" }}
        name={`${docRefUuid}-ace-editor`}
        mode="xml"
        value={docRefContents.data || ""}
        onChange={newValue => {
          if (newValue !== docRefContents.data) {
            onDocumentChange({ data: newValue });
          }
        }}
      />
    </DocRefEditor>
  ) : (
    <Loader message="Loading XSLT..." />
  );
};

export default XsltEditor;
