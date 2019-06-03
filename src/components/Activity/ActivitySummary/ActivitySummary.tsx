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
import useCurrentActivity from "../api/useCurrentActivity";
import ActivityChooserDialog, {
  useDialog,
} from "../ActivityChooser/ActivityChooserDialog";

interface Props {
  name: string;
  value: string;
}

const ActivitySummary: React.FunctionComponent = () => {
  const { currentActivity } = useCurrentActivity();
  const { componentProps, showDialog } = useDialog();

  const details =
    currentActivity &&
    currentActivity.properties &&
    currentActivity.properties
      .filter(({ showInSelection }) => showInSelection)
      .map(({ name, value }, i: number) => {
        return (
          <div className="ActivitySummary__row" key={i}>
            <b>{name}: </b>
            {value}
          </div>
        );
      });
  return (
    <React.Fragment>
      <button className="ActivitySummary control border" onClick={showDialog}>
        <div className="ActivitySummary__header">Current Activity</div>
        {details ? details : <b>None</b>}
      </button>
      <ActivityChooserDialog {...componentProps} />
    </React.Fragment>
  );
};

export default ActivitySummary;
