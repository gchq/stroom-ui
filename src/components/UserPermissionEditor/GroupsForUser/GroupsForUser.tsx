import * as React from "react";
import { useEffect } from "react";

import { User } from "../../../types";

import useApi from "../../../sections/UserPermissions/useUserPermissionsApi";
import useReduxState from "../../../lib/useReduxState";
import Loader from "../../../components/Loader";
import UsersTable, { useTable as useUsersTable } from "../UsersTable";

export interface Props {
  user: User;
}

const GroupsForUser = ({ user }: Props) => {
  const { findGroupsForUser } = useApi();
  useEffect(() => {
    if (user) {
      findGroupsForUser(user.uuid);
    }
  }, [!!user ? user.uuid : null]);

  const groupsForUser = useReduxState(
    ({ userPermissions: { groupsForUser } }) => groupsForUser
  );
  const groups = groupsForUser[user.uuid];

  const { componentProps: tableProps } = useUsersTable(groups);

  if (!groups) {
    return <Loader message={`Loading Groups for User ${user.uuid}`} />;
  }

  return (
    <div>
      <UsersTable {...tableProps} />
    </div>
  );
};

export default GroupsForUser;
