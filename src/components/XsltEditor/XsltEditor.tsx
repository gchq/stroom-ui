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
import { useEffect, useMemo } from "react";
import { useDispatch } from "redux-react-hook";

import DocRefEditor from "../DocRefEditor";
import { ButtonProps } from "../Button";
import Loader from "../Loader";
import useApi from "./useXsltApi";
import ThemedAceEditor from "../ThemedAceEditor";
import { actionCreators } from "./redux";
import useReduxState from "../../lib/useReduxState";

const { xsltUpdated } = actionCreators;

export interface Props {
  xsltUuid: string;
}

const XsltEditor = ({ xsltUuid }: Props) => {
  const api = useApi();
  const dispatch = useDispatch();
  useEffect(() => {
    api.fetchDocument(xsltUuid);
  });

  const { xsltEditor } = useReduxState(({ xsltEditor }) => ({ xsltEditor }));
  const xsltState = xsltEditor[xsltUuid];

  const actionBarItems: Array<ButtonProps> = useMemo(() => {
    if (!xsltState) return [];

    const { isDirty, isSaving } = xsltState;

    const b: Array<ButtonProps> = [
      {
        icon: "save",
        disabled: !(isDirty || isSaving),
        title: isSaving ? "Saving..." : isDirty ? "Save" : "Saved",
        onClick: () => api.saveDocument(xsltUuid)
      }
    ];
    return b;
  }, [xsltState, xsltUuid]);

  if (!xsltState) {
    return <Loader message="Loading XSLT..." />;
  }

  const { xsltData } = xsltState;

  return (
    <DocRefEditor docRefUuid={xsltUuid} actionBarItems={actionBarItems}>
      <ThemedAceEditor
        style={{ width: "100%", height: "100%", minHeight: "25rem" }}
        name={`${xsltUuid}-ace-editor`}
        mode="xml"
        value={xsltData}
        onChange={newValue => {
          if (newValue !== xsltData) dispatch(xsltUpdated(xsltUuid, newValue));
        }}
      />
    </DocRefEditor>
  );
};

export default XsltEditor;
