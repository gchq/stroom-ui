import { useEffect, useState } from "react";

import useApi from "./useApi";
import { User } from "../../types";

export default (userUuid: string): User | undefined => {
  const { fetchUser } = useApi();

  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    fetchUser(userUuid).then(setUser);
  }, [userUuid, fetchUser, setUser]);

  return user;
};