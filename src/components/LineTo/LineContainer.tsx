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

import LineContext from "./LineContext";
import { LineType, LineElementCreator } from "./types";
import StraightLine from "./lineCreators/StraightLine";
import useListReducer from "src/lib/useListReducer";
import LinesSvg from "./LinesSvg";

export interface Props {
  className?: string;
  LineElementCreator?: LineElementCreator;
}

const LineContainer: React.FunctionComponent<Props> = ({
  LineElementCreator = StraightLine,
  className,
  children,
}) => {
  const {
    itemAdded: lineCreated,
    items: rawLines,
    itemRemoved: lineDestroyed,
  } = useListReducer<LineType>(l => l.lineId);

  return (
    <LineContext.Provider
      value={{
        lineCreated,
        lineDestroyed,
      }}
    >
      <div className={className}>
        <LinesSvg LineElementCreator={LineElementCreator} rawLines={rawLines} />
        {children}
      </div>
    </LineContext.Provider>
  );
};

export default LineContainer;
