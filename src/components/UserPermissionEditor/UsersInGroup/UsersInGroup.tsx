import * as React from "react";
import { useEffect } from "react";

import { User } from "../../../types";

import useApi from "../../../sections/UserPermissions/useUserPermissionsApi";
import Loader from "../../../components/Loader";
import useReduxState from "../../../lib/useReduxState";

export interface Props {
  group: User;
}

export interface ConnectState {
  users: Array<User>;
}

const UsersInGroup = ({ group }: Props) => {
  const api = useApi();
  useEffect(() => {
    if (group) {
      api.findUsersInGroup(group.uuid);
    }
  }, [!!group ? group.uuid : null]);

  const { usersInGroup } = useReduxState(
    ({ userPermissions: { usersInGroup } }) => ({
      usersInGroup
    })
  );
  const users = usersInGroup[group.uuid];

  if (!users) {
    return <Loader message={`Loading Users for Group ${group.uuid}`} />;
  }

  return (
    <div>
      <ul>
        {users.map(u => (
          <li key={u.uuid}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersInGroup;
