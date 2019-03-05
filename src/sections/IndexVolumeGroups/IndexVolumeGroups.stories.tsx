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

import StroomDecorator from "../../lib/storybook/StroomDecorator";

import IndexVolumeGroups from "./IndexVolumeGroups";

import "../../styles/main.css";
import { Switch, Route, RouteComponentProps } from "react-router";
import IndexVolumeGroupEditor from "./IndexVolumeGroupEditor";

const IndexVolumeGroupsWithRouter = () => (
  <Switch>
    <Route
      exact
      path="/s/indexing/groups/:groupName"
      render={(props: RouteComponentProps<any>) => (
        <IndexVolumeGroupEditor groupName={props.match.params.groupName} />
      )}
    />
    <Route component={IndexVolumeGroups} />
  </Switch>
);

storiesOf("Sections/Index Volume Groups", module)
  .addDecorator(StroomDecorator)
  .add("Index Volume Groups", () => <IndexVolumeGroupsWithRouter />);
