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
import * as moment from "moment";

import { DataRow } from "src/types";
import { useStreamDataRow } from "src/api/streamAttributeMap";
import Loader from "../Loader";

interface Props {
  data: DataRow;
}

const DetailsTabs = ({ data }: Props) => {
  const dataRow = useStreamDataRow(data.data.id);

  if (!dataRow) {
    return <Loader message="Loading Data" />;
  }

  const panes = [
    {
      menuItem: "Data",
      render: () => (
        <div className="tab-pane">
          {/* 
          TODO: ACtually Source the data
          <DataDetails data={dataRow} /> */}
        </div>
      )
    },
    {
      menuItem: "Details",
      render: () => {
        return (
          <div className="tab-pane">
            <div className="StreamDetails__container">
              <div className="StreamDetails__table__container">
                <table className="StreamDetails__table">
                  <tbody>
                    <tr>
                      <td>Stream ID</td>
                      <td>
                        <code>{dataRow.data.id}</code>
                      </td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>
                        <code> {dataRow.data.status}</code>
                      </td>
                    </tr>
                    <tr>
                      <td>Status MS</td>
                      <td>
                        {moment(dataRow.data.statusMs).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Stream Task ID</td>
                      <td>
                        {/* <code> {details.data.processTaskId}</code> */}
                      </td>
                    </tr>
                    <tr>
                      <td>Parent Stream ID</td>
                      <td>{/* <code>{details.data.parentDataId}</code> */}</td>
                    </tr>
                    <tr>
                      <td>Created</td>
                      <td>
                        {moment(dataRow.data.createMs).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Effective</td>
                      <td>
                        {moment(dataRow.data.effectiveMs).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Stream processor uuid</td>
                      TODO
                      {/* <td>{details.stream.processor.id}</td> */}
                    </tr>
                    <tr>
                      <td>Files</td>
                      TODO
                      {/* <td>{details.fileNameList}</td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      menuItem: "Attributes",
      render: () => (
        <div className="tab-pane">
          <div className="StreamDetails__container">
            <div className="StreamDetails__table__container">
              <table className="StreamDetails__table">
                <tbody>
                  TODO
                  {/* {Object.keys(details.nameValueMap).map((key, index) => {
                    if (key !== 'Until' && key !== 'Rule' && key !== 'Age') {
                      return (
                        <tr>
                          <td>{key}</td>
                          <td>
                            <code>{details.nameValueMap[key]}</code>
                          </td>
                        </tr>
                      );
                    }
                    return undefined;
                  })} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },
    {
      menuItem: "Retention",
      render: () => (
        <div className="tab-pane">
          <div className="RetentionDetails__container">
            <div className="RetentionDetails__table__container">
              <table className="RetentionDetails__table">
                <tbody>
                  <tr>
                    <td>Age</td>
                    TODO
                    {/* <td>{details.nameValueMap.Age}</td> */}
                  </tr>
                  <tr>
                    <td>Until</td>
                    TODO
                    {/* <td>{details.nameValueMap.Until}</td> */}
                  </tr>
                  <tr>
                    <td>Rule</td>
                    TODO
                    {/* <td>{details.nameValueMap.Rule}</td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
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
