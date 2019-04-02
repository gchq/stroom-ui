import * as React from "react";

import useApi from "./useApi";
import { User } from "src/types";

const useUser = (userUuid: string): User | undefined => {
  const { fetchUser } = useApi();

  const [user, setUser] = React.useState<User | undefined>(undefined);
  React.useEffect(() => {
    fetchUser(userUuid).then(setUser);
  }, [userUuid, fetchUser, setUser]);

  return user;
};

export default useUser;
