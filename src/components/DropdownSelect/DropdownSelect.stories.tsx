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

import { storiesOf } from "@storybook/react";

import DropdownSelect from "./DropdownSelect";
import { DropdownOptionProps } from "./types";
import useForm from "../../lib/useForm";
import JsonDebug from "../../testing/JsonDebug";

import { ControlledInput } from "../../types";

const toSimpleOption = (c: string) => ({
  value: c.toLowerCase(),
  text: c
});

const colourOptions = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Indigo",
  "Violet"
].map(toSimpleOption);

const ColorOption = ({
  option: { text, value },
  onClick,
  inFocus
}: DropdownOptionProps) => (
  <div className={`hoverable ${inFocus ? "inFocus" : ""}`} onClick={onClick}>
    <span style={{ backgroundColor: value, width: "2rem" }}>&nbsp;</span>
    {text}
  </div>
);

const ColourPicker = ({ onChange, value }: ControlledInput<string>) => (
  <DropdownSelect
    onChange={onChange}
    value={value}
    options={colourOptions}
    OptionComponent={ColorOption}
  />
);

const weekdayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
].map(toSimpleOption);

const WeekdayPicker = (props: ControlledInput<string>) => (
  <DropdownSelect {...props} options={weekdayOptions} />
);

interface FormValues {
  colour?: string;
  weekday?: string;
}

const initialValues: FormValues = {};

const TestForm = () => {
  const { value, generateControlledInputProps } = useForm({
    initialValues
  });

  const colourPickerProps = generateControlledInputProps<string>("colour");
  const weekdayPickerProps = generateControlledInputProps<string>("weekday");

  return (
    <React.Fragment>
      <form>
        <div>
          <label>Colour</label>
          <ColourPicker {...colourPickerProps} />
        </div>
        <div>
          <label>Weekday</label>
          <WeekdayPicker {...weekdayPickerProps} />
        </div>
      </form>

      <JsonDebug value={value} />
    </React.Fragment>
  );
};

storiesOf("General Purpose/Dropdown Select", module).add(
  "simple pickers",
  () => <TestForm />
);
