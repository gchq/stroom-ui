import * as React from "react";
import { useEffect } from "react";

import { User } from "../../../types";

import { useFindGroupsForUser } from "../../../sections/UserPermissions/client";
import useReduxState from "../../../lib/useReduxState";
import Loader from "../../../components/Loader";

export interface Props {
  user: User;
}

const GroupsForUser = ({ user }: Props) => {
  const findGroupsForUser = useFindGroupsForUser();
  useEffect(() => {
    if (user) {
      findGroupsForUser(user.uuid);
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
