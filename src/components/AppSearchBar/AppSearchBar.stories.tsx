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

import { addThemedStories } from "src/testing/storybook/themedStoryGenerator";
import AppSearchBar from "./AppSearchBar";

import useForm from "src/lib/useForm";
import JsonDebug from "src/testing/JsonDebug";
import { DocRefType } from "src/api/useDocumentApi/types/base";
import { Props as AppSearchProps } from "./types";
import AppSelectBar from "./AppSelectBar";

interface Props {
  Component: React.FunctionComponent<AppSearchProps>;
  typeFilters?: string[];
}

interface FormValues {
  someName: string;
  chosenDocRef?: DocRefType;
}
const defaultValues: FormValues = {
  someName: "",
  chosenDocRef: undefined,
};

let AppSearchAsForm: React.FunctionComponent<Props> = ({
  Component,
  typeFilters,
}) => {
  const { value, useControlledInputProps, useTextInput } = useForm<FormValues>({
    initialValues: defaultValues,
  });

  const someNameProps = useTextInput("someName");
  const chosenDocRefProps = useControlledInputProps<DocRefType>("chosenDocRef");

  return (
    <form>
      <div>
        <label htmlFor="someName">Some Name</label>
        <input {...someNameProps} />
      </div>
      <div>
        <label>Chosen Doc Ref</label>
        <Component typeFilters={typeFilters} {...chosenDocRefProps} />
      </div>

      <JsonDebug value={value} />
    </form>
  );
};

const AppSearchAsPicker: React.FunctionComponent<Props> = ({
  Component,
  typeFilters,
}) => {
  const [pickedDocRef, setPickedDocRef] = React.useState<
    DocRefType | undefined
  >(undefined);

  return (
    <div>
      <Component
        typeFilters={typeFilters}
        onChange={setPickedDocRef}
        value={pickedDocRef}
      />
      <JsonDebug value={{ pickedDocRef }} />
    </div>
  );
};

class AppSearchAsNavigator extends React.Component<
  Props,
  { chosenDocRef?: DocRefType }
> {
  displayRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);

    this.displayRef = React.createRef();
    this.state = {
      chosenDocRef: undefined,
    };
  }
  render() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <this.props.Component
          onChange={d => {
            this.setState({ chosenDocRef: d });
            this.displayRef.current!.focus();
          }}
          value={this.state.chosenDocRef}
        />
        <div tabIndex={0} ref={this.displayRef}>
          {this.state.chosenDocRef
            ? `Would be opening ${this.state.chosenDocRef.name}...`
            : "no doc ref chosen"}
        </div>
      </div>
    );
  }
}

interface AppSearchTest {
  Component: React.FunctionComponent<AppSearchProps>;
  name: string;
}

([
  { name: "Search", Component: AppSearchBar },
  { name: "Select", Component: AppSelectBar },
] as AppSearchTest[]).forEach(({ name, Component }) => {
  const stories = storiesOf(`Doc Ref/App ${name} Bar`, module);

  stories
    .add("Search Bar (global)", () => (
      <AppSearchAsNavigator {...{ Component }} />
    ))
    .add("Doc Ref Form", () => <AppSearchAsForm {...{ Component }} />)
    .add("Doc Ref Picker", () => <AppSearchAsPicker {...{ Component }} />)
    .add("Doc Ref Form (Pipeline)", () => (
      <AppSearchAsForm {...{ Component }} typeFilters={["Pipeline"]} />
    ))
    .add("Doc Ref Picker (Feed AND Dictionary)", () => (
      <AppSearchAsPicker
        {...{ Component }}
        typeFilters={["Feed", "Dictionary"]}
      />
    ))
    .add("Doc Ref Form (Folders)", () => (
      <AppSearchAsForm {...{ Component }} typeFilters={["Folder"]} />
    ));

  addThemedStories(stories, () => <AppSearchAsNavigator {...{ Component }} />);
});
