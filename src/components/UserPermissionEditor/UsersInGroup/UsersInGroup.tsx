import * as React from "react";
import { useEffect } from "react";

import { User } from "../../../types";

import useApi from "../../../sections/UserPermissions/useUserPermissionsApi";
import Loader from "../../../components/Loader";
import useReduxState from "../../../lib/useReduxState";
import UsersTable, { useTable as useUsersTable } from "../UsersTable";

export interface Props {
  group: User;
}

export interface ConnectState {
  users: Array<User>;
}

const UsersInGroup = ({ group }: Props) => {
  const { findUsersInGroup } = useApi();
  useEffect(() => {
    if (group) {
      findUsersInGroup(group.uuid);
    }
  }, [!!group ? group.uuid : null]);

  const { usersInGroup } = useReduxState(
    ({ userPermissions: { usersInGroup } }) => ({
      usersInGroup
    })
  );
  const users = usersInGroup[group.uuid];

  const { componentProps: tableProps } = useUsersTable(users);

  if (!users) {
    return <Loader message={`Loading Users for Group ${group.uuid}`} />;
  }

  return (
    <div>
      <UsersTable {...tableProps} />
    </div>
  );
};

export default UsersInGroup;
