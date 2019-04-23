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

import ExpressionOperator from "./ExpressionOperator";
import { DataSourceType, ExpressionOperatorType } from "./types";
import ReadOnlyExpressionBuilder from "./ReadOnlyExpressionBuilder/ReadOnlyExpressionBuilder";
import { LineContainer } from "../LineTo";
import useToggle from "src/lib/useToggle";

interface Props {
  className?: string;
  dataSource: DataSourceType;
  showModeToggle?: boolean;
  editMode?: boolean;
  expression: ExpressionOperatorType;
  onChange: (e: ExpressionOperatorType) => void;
}

const ExpressionBuilder: React.FunctionComponent<Props> = ({
  dataSource,
  showModeToggle,
  editMode,
  expression,
  onChange,
}) => {
  const { value: inEditMode, toggle: toggleEditMode } = useToggle(editMode);

  return (
    <LineContainer>
      {showModeToggle && !!dataSource && (
        <React.Fragment>
          <label>Edit Mode</label>
          <input
            type="checkbox"
            checked={inEditMode}
            onChange={toggleEditMode}
          />
        </React.Fragment>
      )}
      {inEditMode ? (
        <ExpressionOperator
          dataSource={dataSource}
          isEnabled
          value={expression}
          onChange={onChange}
        />
      ) : (
        <ReadOnlyExpressionBuilder expression={expression} />
      )}
    </LineContainer>
  );
};

export default ExpressionBuilder;
