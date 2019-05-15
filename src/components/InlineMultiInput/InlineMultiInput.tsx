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

import Button from "components/Button";
import InlineInput from "components/InlineInput/InlineInput";
import * as React from "react";

interface Props {
  onChange?: (event: string) => void;
  values?: string[];
}

const InlineMultiInput: React.FunctionComponent<Props> = ({
  onChange,
  values: defaultValues,
  ...rest
}) => {
  const [values, setValues] = React.useState(defaultValues || []);
  console.log({ values });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    console.log('handleInputChange');
    console.log({ index });
    console.log({ values });
    const newValues = Object.assign([], values);
    newValues[index] = event.target.value;
    setValues(newValues);
    console.log({ newValues });
  }

  const handleInputRemoval = (value: string) => {
    console.log("handleInputRemoval");
    console.log({ value });
    const newValues = values.filter(removalCandidate => removalCandidate !== value)
    setValues(newValues);
    console.log({ newValues });
  }

  return (
    <span>
      [
        {values.map((value, index) => {
        console.log("Looping");
        console.log({ value });
        return (
          <React.Fragment>
            <InlineInput
              value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange(event, index);
              }}
              {...rest} />
            <Button
              type="button"
              size="small"
              appearance="icon"
              action="secondary"
              text="Remove"
              icon="times"
              title="Remove"
              onClick={() => {
                handleInputRemoval(value);
              }}
            />
            {index !== values.length - 1 ?
              <span>,{"\u00A0"}</span> : undefined}
          </React.Fragment>
        )
      })}

      <Button
        size="small"
        type="button"
        appearance="icon"
        action="primary"
        text="Add"
        icon="plus"
        title="Add"
        onClick={() => {
          const newValues = Object.assign([], values);
          newValues.push("");
          setValues(newValues);
        }}
      />
      ]
    </span>
  )
};

export default InlineMultiInput;
