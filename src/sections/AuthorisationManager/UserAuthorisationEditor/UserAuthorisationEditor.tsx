import * as React from "react";

import IconHeader from "../../../components/IconHeader";
import Button from "../../../components/Button";
import UsersInGroup from "../UsersInGroup";
import GroupsForUser from "../GroupsForUser";
import { useUser } from "../../../api/userGroups";
import Loader from "../../../components/Loader";
import useRouter from "../../../lib/useRouter";

export interface Props {
  userUuid: string;
}

const UserAuthorisationEditor = ({ userUuid }: Props) => {
  const { history } = useRouter();
  const user = useUser(userUuid);

  if (!user) {
    return <Loader message="Loading user..." />;
  }

  const title = user.isGroup ? `Group ${user.name}` : `User ${user.name}`;

  return (
    <div>
      <IconHeader text={title} icon="user" />
      <Button text="Back" onClick={() => history.push("/s/authorisation")} />

      {user.isGroup ? (
        <UsersInGroup group={user} />
      ) : (
        <GroupsForUser user={user} />
      )}
    </div>
  );
};

export default UserAuthorisationEditor;
