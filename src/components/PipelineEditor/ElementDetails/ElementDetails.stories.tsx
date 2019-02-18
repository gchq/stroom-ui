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
import { useEffect } from "react";
import { useDispatch } from "redux-react-hook";

import { storiesOf } from "@storybook/react";
import "../../../styles/main.css";

import ElementDetails, { Props as ElementDetailsProps } from "./ElementDetails";
import { actionCreators as pipelineActionCreators } from "../redux";
import StroomDecorator from "../../../lib/storybook/StroomDecorator";
import { fullTestData } from "../../../lib/storybook/fullTestData";
import usePipelineState from "../redux/usePipelineState";

const { pipelineElementSelected } = pipelineActionCreators;

interface Props extends ElementDetailsProps {
  testElementId: string;
  testElementConfig: object;
}

const TestElementDetails = ({
  pipelineId,
  testElementId,
  testElementConfig,
  ...rest
}: Props) => {
  const pipelineState = usePipelineState(pipelineId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      pipelineElementSelected(pipelineId, testElementId, testElementConfig)
    );
  }, [pipelineState]);

  return <ElementDetails pipelineId={pipelineId} {...rest} />;
};

const stories = storiesOf("Pipeline/Element Details", module).addDecorator(
  StroomDecorator
);

Object.entries(fullTestData.pipelines).map(pipeline => {
  pipeline[1].merged.elements.add!.map(element => {
    stories.add(`${pipeline[1].docRef.uuid} - ${element.id}`, () => (
      <TestElementDetails
        pipelineId={pipeline[1].docRef.uuid}
        testElementId={element.id}
        testElementConfig={{ splitDepth: 10, splitCount: 10 }}
        onClose={() => {
          console.log("Closing Prevented in Story");
        }}
      />
    ));
  });
});
