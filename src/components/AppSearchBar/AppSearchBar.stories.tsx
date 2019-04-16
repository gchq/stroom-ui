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

import useForm from "src/lib/useForm";
import JsonDebug from "src/testing/JsonDebug";
import { DocRefType } from "src/components/DocumentEditors/useDocumentApi/types/base";
import AppSearchBar from "./AppSearchBar";

interface Props {
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

let AppSearchAsForm: React.FunctionComponent<Props> = ({ typeFilters }) => {
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
        <AppSearchBar typeFilters={typeFilters} {...chosenDocRefProps} />
      </div>

      <JsonDebug value={value} />
    </form>
  );
};

const AppSearchAsPicker: React.FunctionComponent<Props> = ({ typeFilters }) => {
  const [pickedDocRef, setPickedDocRef] = React.useState<
    DocRefType | undefined
  >(undefined);

  return (
    <div>
      <AppSearchBar
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
        <AppSearchBar
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

const stories = storiesOf(`Doc Ref/App Search Bar`, module);

stories
  .add("Search Bar (global)", () => <AppSearchAsNavigator />)
  .add("Doc Ref Form", () => <AppSearchAsForm />)
  .add("Doc Ref Picker", () => <AppSearchAsPicker />)
  .add("Doc Ref Form (Pipeline)", () => (
    <AppSearchAsForm typeFilters={["Pipeline"]} />
  ))
  .add("Doc Ref Picker (Feed AND Dictionary)", () => (
    <AppSearchAsPicker typeFilters={["Feed", "Dictionary"]} />
  ))
  .add("Doc Ref Form (Folders)", () => (
    <AppSearchAsForm typeFilters={["Folder"]} />
  ));

addThemedStories(stories, () => <AppSearchAsNavigator />);
