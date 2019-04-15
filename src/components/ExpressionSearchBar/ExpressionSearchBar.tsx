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
import * as uuidv4 from "uuid/v4";

import { processSearchString } from "./expressionSearchBarUtils";
import Button from "../Button";
import { StyledComponentProps } from "src/types";
import { assignRandomUuids } from "src/lib/treeUtils";
import { toString } from "../ExpressionBuilder/expressionUtils";
import { ExpressionBuilder } from "../ExpressionBuilder";
import {
  DataSourceType,
  ExpressionOperatorWithUuid,
} from "../ExpressionBuilder/types";

interface Props extends StyledComponentProps {
  dataSource: DataSourceType;
  onSearch: (e: ExpressionOperatorWithUuid) => void;
  initialSearchString?: string;
  initialSearchExpression?: ExpressionOperatorWithUuid;
}

const defaultSearchExpression: ExpressionOperatorWithUuid = {
  type: "operator",
  op: "AND",
  enabled: true,
  uuid: uuidv4(),
  children: [],
};

const ExpressionSearchBar: React.FunctionComponent<Props> = ({
  initialSearchString,
  initialSearchExpression,
  dataSource,
  onSearch,
}) => {
  const [isExpression, setIsExpression] = React.useState<boolean>(false);
  const [expression, setExpression] = React.useState<
    ExpressionOperatorWithUuid
  >(initialSearchExpression || defaultSearchExpression);
  const [searchString, setSearchString] = React.useState<string>(
    initialSearchString || "",
  );
  const [isSearchStringValid, setIsSearchStringValid] = React.useState<boolean>(
    true,
  );
  const [
    searchStringValidationMessages,
    setSearchStringValidationMessages,
  ] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!expression) {
      const parsedExpression = processSearchString(dataSource, "");
      const e = assignRandomUuids(
        parsedExpression.expression,
      ) as ExpressionOperatorWithUuid;
      setExpression(e);
    }

    onSearch(expression);
  }, [onSearch, setExpression]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    const expression = processSearchString(dataSource, value);
    const invalidFields = expression.fields.filter(
      field =>
        !field.conditionIsValid || !field.fieldIsValid || !field.valueIsValid,
    );

    const searchStringValidationMessages: string[] = [];
    if (invalidFields.length > 0) {
      invalidFields.forEach(invalidField => {
        searchStringValidationMessages.push(
          `'${invalidField.original}' is not a valid search term`,
        );
      });
    }

    setIsSearchStringValid(invalidFields.length === 0);
    setSearchStringValidationMessages(searchStringValidationMessages);
    setSearchString(value);

    const parsedExpression = processSearchString(dataSource, searchString);
    const e = assignRandomUuids(
      parsedExpression.expression,
    ) as ExpressionOperatorWithUuid;
    setExpression(e);
  };

  const onClickSearch = React.useCallback(() => {
    onSearch(expression);
  }, [onSearch, expression]);
  const onClickSetTextSearch = React.useCallback(() => {
    setIsExpression(false);
  }, [setIsExpression]);
  const onClickSetExpressionSearch = React.useCallback(() => {
    if (!isExpression) {
      const parsedExpression = processSearchString(dataSource, searchString);
      const e = assignRandomUuids(
        parsedExpression.expression,
      ) as ExpressionOperatorWithUuid;
      setExpression(e);
      setIsExpression(true);
    }
  }, [dataSource, searchString, setExpression, setIsExpression]);

  return (
    <div className="dropdown search-bar borderless">
      <div className="search-bar__header">
        <input
          placeholder="I.e. field1=value1 field2=value2"
          value={
            isExpression && !!expression ? toString(expression) : searchString
          }
          className="search-bar__input"
          onChange={onChange}
        />
        <Button
          disabled={!isSearchStringValid}
          icon="search"
          onClick={onClickSearch}
        />
      </div>
      <div tabIndex={0} className={`dropdown__content search-bar__content`}>
        <div className="search-bar__content__header">
          <Button
            text="Text search"
            selected={!isExpression}
            icon="i-cursor"
            className="search-bar__modeButton raised-low bordered hoverable"
            onClick={onClickSetTextSearch}
          />
          <Button
            text="Expression search"
            selected={isExpression}
            disabled={!isSearchStringValid}
            className="search-bar__modeButton raised-low bordered hoverable"
            icon="edit"
            onClick={onClickSetExpressionSearch}
          />
        </div>
        {isExpression && !!expression ? (
          <ExpressionBuilder
            className="search-bar__expressionBuilder"
            showModeToggle={false}
            editMode
            dataSource={dataSource}
            expression={expression}
            onChange={setExpression}
          />
        ) : (
          <div>{searchStringValidationMessages}</div>
        )}
      </div>
    </div>
  );
};

export default ExpressionSearchBar;
