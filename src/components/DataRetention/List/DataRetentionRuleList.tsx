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

import * as React from "react";
import DataRetentionRuleEditor from "../Editor/DataRetentionRuleEditor";
import { DataRetentionPolicy } from "../types/DataRetentionPolicy";

interface Props {
  policy: DataRetentionPolicy;
}

const DataRetentionRuleList: React.FunctionComponent<Props> = ({ policy }) => {
  return (
    <div className="DataRetentionRuleList__content">
      {policy.rules.map((rule, index) => {
        return (
          <div key={index} className="DataRetentionRuleList__rule">
            <DataRetentionRuleEditor
              rule={rule}
              onChange={() => console.log("sdfsd")}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DataRetentionRuleList;
