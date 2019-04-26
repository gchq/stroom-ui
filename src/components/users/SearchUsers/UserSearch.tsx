/*
 * Copyright 2017 Crown Copyright
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
import { useState } from "react";
import ReactTable, { RowInfo, ComponentPropsGetterR } from "react-table";
import "react-table/react-table.css";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import Button from "components/Button";
import { User } from "..";
import { getColumnFormat } from "./tableCustomisations";

interface UserSearchProps {
  onNewUserClicked: () => void;
  onUserOpen: (selectedUserId: string) => void;
  users: User[];
  onDeleteUser: (userId: string) => void;
}

const UserSearch: React.FunctionComponent<UserSearchProps> = ({
  onNewUserClicked,
  onUserOpen,
  users,
  onDeleteUser,
}) => {
  const [isFilteringEnabled, setFilteringEnabled] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const deleteButtonDisabled = !selectedUser;

  const getTrProps: ComponentPropsGetterR = React.useCallback(
    (state: any, rowInfo: RowInfo | undefined) => {
      let selected = false;
      if (rowInfo) {
        selected = rowInfo.row.id === selectedUser;
      }
      return {
        onClick: () => {
          if (!!rowInfo) {
            setSelectedUser(rowInfo.row.id);
          }
          // changeSelectedUser(rowInfo.row.id);
        },
        className: selected
          ? "table-row-small table-row-selected"
          : "table-row-small",
      };
    },
    [setSelectedUser],
  );

  return (
    <div className="UserSearch-main">
      <div className="header">
        <Button
          className="toolbar-button-small primary"
          onClick={() => onNewUserClicked()}
          icon="plus"
          text="Create"
        />
        {deleteButtonDisabled ? (
          <div>
            <Button
              className="toolbar-button-small primary"
              disabled
              icon="edit"
              text="View/edit"
            />
          </div>
        ) : (
          <Button
            className="toolbar-button-small primary"
            onClick={() => onUserOpen(selectedUser)}
            icon="edit"
            text="View/edit"
          />
        )}

        <div>
          <Button
            disabled={deleteButtonDisabled}
            onClick={() => {
              if (!!selectedUser) {
                onDeleteUser(selectedUser);
                // remove(selectedUser);
              }
            }}
            className="toolbar-button-small primary"
            icon="trash"
            text="Delete"
          />
        </div>
        <div className="UserSearch-filteringToggle">
          <label>Show filtering</label>
          <Toggle
            icons={false}
            checked={isFilteringEnabled}
            onChange={event => setFilteringEnabled(event.target.checked)}
          />
        </div>
      </div>
      <div className="UserSearch-content">
        <div className="table-small-container">
          <ReactTable
            data={users}
            className="-striped -highlight UserSearch-table"
            columns={getColumnFormat(selectedUser)}
            defaultSorted={[
              {
                id: "email",
                desc: true,
              },
            ]}
            filterable={isFilteringEnabled}
            showPagination
            defaultPageSize={50}
            style={{
              // We use 'calc' because we want full height but need
              // to account for the header. Obviously if the header height
              // changes this offset will need to change too.
              height: "calc(100vh - 50px)",
            }}
            getTheadTrProps={() => {
              return {
                className: "table-header-small",
              };
            }}
            getTheadProps={() => {
              return {
                className: "table-row-small",
              };
            }}
            getTrProps={getTrProps}
          />
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
