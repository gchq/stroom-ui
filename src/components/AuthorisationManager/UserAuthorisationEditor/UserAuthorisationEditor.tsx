import * as React from "react";

import IconHeader from "src/components/IconHeader";
import Button from "src/components/Button";
import UsersInGroup from "../UsersInGroup";
import GroupsForUser from "../GroupsForUser";
import { useUser } from "src/api/userGroups";
import Loader from "src/components/Loader";
import useRouter from "src/lib/useRouter";
import { useAppPermissionsForUser } from "src/api/appPermission";
import { AppPermissionPicker } from "../AppPermissionPicker";

interface Props {
  userUuid: string;
}

const UserAuthorisationEditor = ({ userUuid }: Props) => {
  const { history } = useRouter();
  const user = useUser(userUuid);
  const {
    userAppPermissions,
    addPermission,
    removePermission,
  } = useAppPermissionsForUser(userUuid);

  if (!user) {
    return <Loader message="Loading user..." />;
  }

  const title = user.isGroup ? `Group ${user.name}` : `User ${user.name}`;

  return (
    <div>
      <IconHeader text={title} icon="user" />
      <Button text="Back" onClick={history.goBack} />

      <section>
        <h2>Application Permissions</h2>
        <AppPermissionPicker
          {...{ value: userAppPermissions, addPermission, removePermission }}
        />
      </section>

      {user.isGroup ? (
        <UsersInGroup group={user} />
      ) : (
        <GroupsForUser user={user} />
      )}
    </div>
  );
};

export default UserAuthorisationEditor;
