import * as React from "react";
import { useEffect } from "react";

import useReduxState from "../../lib/useReduxState/useReduxState";
import IconHeader from "../IconHeader";
import Button from "../Button";
import UsersInGroup from "./UsersInGroup";
import GroupsForUser from "./GroupsForUser";
import { GlobalStoreState } from "../../startup/reducers";
import useApi from "../../sections/UserPermissions/useUserPermissionsApi";
import Loader from "../Loader";
import useRouter from "../../lib/useRouter";

export interface Props {
  userUuid: string;
  listingId: string;
}

const UserPermissionEditor = ({ listingId, userUuid }: Props) => {
  const { history } = useRouter();
  const { findUsers } = useApi();
  useEffect(() => {
    findUsers(listingId, undefined, undefined, userUuid);
  }, []);

  const user = useReduxState(
    ({ userPermissions: { users } }: GlobalStoreState) =>
      users[listingId] && users[listingId].find(u => u.uuid === userUuid),
    [listingId, userUuid]
  );

  if (!user) {
    return <Loader message="Loading user..." />;
  }

  return (
    <div>
      <IconHeader text={`Permissions for ${user.name}`} icon="user" />
      <Button text="Back" onClick={() => history.push("/s/userPermissions")} />

      {user.isGroup ? (
        <UsersInGroup group={user} />
      ) : (
        <GroupsForUser user={user} />
      )}
    </div>
  );
};

export default UserPermissionEditor;
