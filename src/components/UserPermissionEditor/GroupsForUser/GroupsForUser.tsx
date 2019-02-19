import * as React from "react";
import { useEffect } from "react";

import { User } from "../../../types";

import useApi from "../../../sections/UserPermissions/useUserPermissionsApi";
import useReduxState from "../../../lib/useReduxState";
import Loader from "../../../components/Loader";

export interface Props {
  user: User;
}

const GroupsForUser = ({ user }: Props) => {
  const api = useApi();
  useEffect(() => {
    if (user) {
      api.findGroupsForUser(user.uuid);
    }
  }, [!!user ? user.uuid : null]);

  const { groupsForUser } = useReduxState(
    ({ userPermissions: { groupsForUser } }) => ({
      groupsForUser
    })
  );
  const groups = groupsForUser[user.uuid];

  if (!groups) {
    return <Loader message={`Loading Groups for User ${user.uuid}`} />;
  }

  return (
    <div>
      <ul>
        {groups.map(g => (
          <li key={g.uuid}>{g.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsForUser;
