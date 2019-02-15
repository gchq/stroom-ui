import * as React from "react";
import { useEffect } from "react";

import useReduxState from "../../lib/useReduxState/useReduxState";
import IconHeader from "../IconHeader";
import Button from "../Button";
import UsersInGroup from "./UsersInGroup";
import GroupsForUser from "./GroupsForUser";
import { GlobalStoreState } from "../../startup/reducers";
import { useFindUsers } from "../../sections/UserPermissions/client";
import Loader from "../Loader";
import useHistory from "../../lib/useHistory";

export interface Props {
  userUuid: string;
  listingId: string;
}

const UserPermissionEditor = ({ listingId, userUuid }: Props) => {
  const history = useHistory();
  const findUsers = useFindUsers();
  useEffect(() => {
    findUsers(listingId, undefined, undefined, userUuid);
  }, []);

  const { user } = useReduxState(
    ({ userPermissions: { users } }: GlobalStoreState) => ({
      user: users[listingId] && users[listingId].find(u => u.uuid === userUuid)
    }),
    [listingId, userUuid]
  );

  return (
    <div>
      <IconHeader text={`User Permissions for ${userUuid}`} icon="user" />
      <Button text="Back" onClick={() => history.push("/s/userPermissions")} />
      {user ? (
        user.isGroup ? (
          <UsersInGroup group={user} />
        ) : (
          <GroupsForUser user={user} />
        )
      ) : (
        <Loader message="Loading user..." />
      )}
    </div>
  );
};

export default UserPermissionEditor;
