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

import DocRefEditor from "../DocRefEditor";
import { ButtonProps } from "../Button";
import Loader from "../Loader";
import useIndexApi from "./useIndexApi";
import ThemedAceEditor from "../ThemedAceEditor";
import { actionCreators } from "./redux";
import { useDispatch } from "redux-react-hook";
import useReduxState from "../../lib/useReduxState";

const { indexUpdated } = actionCreators;

export interface Props {
  indexUuid: string;
}

const IndexEditor = ({ indexUuid }: Props) => {
  const { indexEditor } = useReduxState(({ indexEditor }) => ({ indexEditor }));

  const indexApi = useIndexApi();
  const dispatch = useDispatch();

  useEffect(() => {
    indexApi.fetchDocument(indexUuid);
  }, []);

  const indexState = indexEditor[indexUuid];

  const actionBarItems: Array<ButtonProps> = useMemo(() => {
    if (!indexState) return [];
    const { isDirty, isSaving } = indexState;
    const b: Array<ButtonProps> = [
      {
        icon: "save",
        disabled: !(isDirty || isSaving),
        title: isSaving ? "Saving..." : isDirty ? "Save" : "Saved",
        onClick: () => indexApi.saveDocument(indexUuid)
      }
    ];
    return b;
  }, [indexUuid, indexState]);

  if (!indexState) {
    return <Loader message="Loading Index..." />;
  }

  const { indexData } = indexState;

  return (
    <DocRefEditor docRefUuid={indexUuid} actionBarItems={actionBarItems}>
      <ThemedAceEditor
        style={{ width: "100%", height: "100%", minHeight: "25rem" }}
        name={`${indexUuid}-ace-editor`}
        mode="xml"
        value={indexData}
        onChange={v => {
          if (v !== indexData) dispatch(indexUpdated(indexUuid, v));
        }}
      />
    </DocRefEditor>
  );
};

export default IndexEditor;
