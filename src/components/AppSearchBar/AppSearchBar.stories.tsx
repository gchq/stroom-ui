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

import { addThemedStories } from "testing/storybook/themedStoryGenerator";

import useForm from "lib/useForm";
import JsonDebug from "testing/JsonDebug";
import { DocRefType } from "components/DocumentEditors/useDocumentApi/types/base";
import AppSearchBar from "./AppSearchBar";

interface Props {
  typeFilter?: string;
}

interface FormValues {
  chosenDocRef?: DocRefType;
}
const defaultValues: FormValues = {
  chosenDocRef: undefined,
};

let AppSearchAsForm: React.FunctionComponent<Props> = ({ typeFilter }) => {
  const { value, useControlledInputProps } = useForm<FormValues>({
    initialValues: defaultValues,
  });

  const chosenDocRefProps = useControlledInputProps<DocRefType>("chosenDocRef");

  return (
    <form>
      <div>
        <label>Chosen Doc Ref</label>
        <AppSearchBar typeFilter={typeFilter} {...chosenDocRefProps} />
      </div>

      <JsonDebug value={value} />
    </form>
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

const globalSearch = storiesOf(`App Search Bar/Global Search`, module);
addThemedStories(globalSearch, () => <AppSearchAsNavigator />);

const asForm = storiesOf(`App Search Bar/In Form`, module);
addThemedStories(asForm, () => <AppSearchAsForm />);

const asFormSpecificType = storiesOf(`App Search Bar/Specific Type`, module);
addThemedStories(asFormSpecificType, () => (
  <AppSearchAsForm typeFilter="Pipeline" />
));

const asFormFolder = storiesOf(`App Search Bar/Find Folder`, module);
addThemedStories(asFormFolder, () => <AppSearchAsForm typeFilter="Folder" />);
