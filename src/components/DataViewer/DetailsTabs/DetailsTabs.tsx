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

import { useStreamDataRow } from "components/DataViewer/api/streamAttributeMap";
import Loader from "components/Loader";
import { DataRow } from "../types";
import StreamDetails from "./StreamDetails";
import StreamAttributes from "./StreamAttributes";
import DataRetention from "./DataRetention";

interface Props {
  data: DataRow;
}

const DetailsTabs: React.FunctionComponent<Props> = ({ data }) => {
  const dataRow = useStreamDataRow(data.meta.id);

  const renderData = React.useCallback(
    () => (
      <div className="tab-pane">{/* <DataDetails meta={dataRow} /> */}</div>
    ),
    [], // dataRow
  );

  if (!dataRow) {
    return <Loader message="Loading Data" />;
  }

  const panes = [
    {
      menuItem: "Data",
      render: renderData,
    },
    {
      menuItem: "Details",
      render: <StreamDetails dataRow={dataRow} />,
    },
    {
      menuItem: "Attributes",
      render: <StreamAttributes dataRow={dataRow} />,
    },
    {
      menuItem: "Retention",
      render: <DataRetention dataRow={dataRow} />,
    },
  ];
  if (panes) {
    console.log("Panes defined"); // TODO
  }
  return (
    <div className="DetailsTabs__container">
      <div className="DetailsTabs__contained" />
    </div>
  );
};

export default DetailsTabs;
