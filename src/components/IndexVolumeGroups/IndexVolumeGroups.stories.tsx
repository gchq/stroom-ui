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

import { Switch, Route, RouteComponentProps } from "react-router";

import IndexVolumeGroups from "./IndexVolumeGroups";
import IndexVolumeGroupEditor from "./IndexVolumeGroupEditor";
import { addStory } from "testing/storybook/themedStoryGenerator";
import useAppNavigation from "lib/useAppNavigation";

const TestHarness: React.FunctionComponent = () => {
  const {
    urlGenerator: { goToIndexVolumeGroup },
  } = useAppNavigation();
  return (
    <Switch>
      <Route
        exact
        path={goToIndexVolumeGroup(":groupName")}
        render={(props: RouteComponentProps<any>) => (
          <IndexVolumeGroupEditor groupName={props.match.params.groupName} />
        )}
      />
      <Route
        render={(props: RouteComponentProps<any>) => (
          <div>
            {props.location.pathname}
            <IndexVolumeGroups />
          </div>
        )}
      />
      <Route component={IndexVolumeGroups} />
    </Switch>
  );
};

addStory("Sections/Index Volume Groups", "Index Volume Groups", module, () => (
  <TestHarness />
));
