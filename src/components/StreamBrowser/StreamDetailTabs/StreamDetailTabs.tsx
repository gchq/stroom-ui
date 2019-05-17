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
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { useStreamDataRow } from "components/StreamBrowser/api/streamAttributeMap";
import Loader from "components/Loader";
import { DataRow } from "../types";
import StreamDetails from "./StreamDetails";
import StreamAttributes from "./StreamAttributes";
import DataRetention from "./DataRetention";

interface Props {
  data: DataRow;
}

const StreamDetailTabs: React.FunctionComponent<Props> = ({ data }) => {
  const dataRow = useStreamDataRow(data.meta.id);

  if (!dataRow) {
    return <Loader message="Loading Data" />;
  }

  return (
    <Tabs>
      <TabList>
        <Tab>Data</Tab>
        <Tab>Details</Tab>
        <Tab>Attributes</Tab>
        <Tab>Retention</Tab>
      </TabList>

      <TabPanel>
        <div>I O U Data Display</div>
      </TabPanel>
      <TabPanel>
        <StreamDetails dataRow={dataRow} />
      </TabPanel>
      <TabPanel>
        <StreamAttributes dataRow={dataRow} />
      </TabPanel>
      <TabPanel>
        <DataRetention dataRow={dataRow} />
      </TabPanel>
    </Tabs>
  );
};

export default StreamDetailTabs;
