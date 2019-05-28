/*
 * Copyright 2019 Crown Copyright
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

import Button from "components/Button";
import IconHeader from "components/IconHeader";
import * as React from "react";
import { useCallback } from "react";
import DataRetentionRuleList from "../List/DataRetentionRuleList";
import { DataRetentionPolicy } from "../types/DataRetentionPolicy";

interface Props {
  policy: DataRetentionPolicy;
}

const DataRetentionSection: React.FunctionComponent<Props> = ({ policy }) => {
  const handleCreate = useCallback(() => console.log("todo"), []);
  const handleDelete = useCallback(() => console.log("todo"), []);
  const handleEdit = useCallback(() => console.log("todo"), []);
  const handleCopy = useCallback(() => console.log("todo"), []);
  const isItemSelected = false;
  return (
    <div className="page">
      <div className="page__header">
        <IconHeader text="Data Retention Policy" icon="trash-alt" />
        <div className="page__buttons Button__container">
          <Button onClick={handleCreate} icon="plus" text="Create" />
          <Button
            disabled={isItemSelected}
            onClick={handleEdit}
            icon="edit"
            text="Edit"
          />
          <Button
            disabled={isItemSelected}
            onClick={handleCopy}
            icon="copy"
            text="Copy"
          />
          <Button
            disabled={isItemSelected}
            onClick={handleDelete}
            icon="trash"
            text="Delete"
          />
        </div>
      </div>
      <div className="page__search" />
      <div className="DataRetentionSection__content">
        <DataRetentionRuleList
          value={policy.rules}
          onChange={() => {
            console.log("TODO");
          }}
        />
      </div>
    </div>
  );
};

export default DataRetentionSection;
