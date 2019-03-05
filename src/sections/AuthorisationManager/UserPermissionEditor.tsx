import * as React from "react";
import { useEffect, useState } from "react";

import IconHeader from "../../components/IconHeader";
import Button from "../../components/Button";
import UsersInGroup from "./UsersInGroup";
import GroupsForUser from "./GroupsForUser";
import useApi from "./useUserPermissionsApi";
import Loader from "../../components/Loader";
import useRouter from "../../lib/useRouter";
import { User } from "../../types";

export interface Props {
  userUuid: string;
  listingId: string;
}

const UserPermissionEditor = ({ listingId, userUuid }: Props) => {
  const { history } = useRouter();
  const { fetchUser } = useApi();
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    fetchUser(userUuid).then(setUser);
  }, []);

  if (!user) {
    return <Loader message="Loading user..." />;
  }

  return (
    <div>
      <IconHeader text={`Permissions for ${user.name}`} icon="user" />
      <Button text="Back" onClick={() => history.push("/s/authorisation")} />

      {user.isGroup ? (
        <UsersInGroup group={user} />
      ) : (
        <GroupsForUser user={user} />
      )}
    </div>
  );
};

export default UserPermissionEditor;
