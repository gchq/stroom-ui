import { useCallback } from "react";

import useHttpClient from "../useHttpClient";
import { User } from "../../types";
import { IsGroup } from "./types";
import { useConfig } from "../../startup/config";

interface Api {
  fetchUser: (uuid: string) => Promise<User>;
  findUsers: (
    name?: string,
    isGroup?: IsGroup,
    uuid?: string
  ) => Promise<Array<User>>;
  findUsersInGroup: (groupUuid: string) => Promise<Array<User>>;
  findGroupsForUser: (userUuid: string) => Promise<Array<User>>;
  createUser: (name: string, isGroup: boolean) => Promise<User>;
  deleteUser: (uuid: string) => Promise<void>;
  addUserToGroup: (userUuid: string, groupUuid: string) => Promise<void>;
  removeUserFromGroup: (userUuid: string, groupUuid: string) => Promise<void>;
}

export const useApi = (): Api => {
  const { stroomBaseServiceUrl } = useConfig();
  const {
    httpGetJson,
    httpPostJsonResponse,
    httpDeleteEmptyResponse,
    httpPutEmptyResponse
  } = useHttpClient();

  return {
    fetchUser: useCallback(
      (userUuid: string): Promise<User> =>
        httpGetJson(`${stroomBaseServiceUrl}/users/v1/${userUuid}`, {}, false),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    addUserToGroup: useCallback(
      (userUuid: string, groupUuid: string) =>
        httpPutEmptyResponse(
          `${stroomBaseServiceUrl}/users/v1/${userUuid}/${groupUuid}`
        ),
      [stroomBaseServiceUrl, httpPutEmptyResponse]
    ),
    createUser: useCallback(
      (name: string, isGroup: boolean) =>
        httpPostJsonResponse(`${stroomBaseServiceUrl}/users/v1`, {
          body: JSON.stringify({
            name,
            isGroup
          })
        }),
      [stroomBaseServiceUrl, httpPostJsonResponse]
    ),
    deleteUser: useCallback(
      (uuid: string) =>
        httpDeleteEmptyResponse(`${stroomBaseServiceUrl}/users/v1/${uuid}`),
      [stroomBaseServiceUrl, httpDeleteEmptyResponse]
    ),
    findGroupsForUser: useCallback(
      (userUuid: string) =>
        httpGetJson(
          `${stroomBaseServiceUrl}/users/v1/groupsForUser/${userUuid}`,
          {},
          false
        ),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    findUsers: useCallback(
      (name?: string, isGroup?: "Group" | "User", uuid?: string) => {
        var url = new URL(`${stroomBaseServiceUrl}/users/v1`);
        if (name !== undefined && name.length > 0)
          url.searchParams.append("name", name);
        if (isGroup !== undefined) {
          switch (isGroup) {
            case "Group":
              url.searchParams.append("isGroup", "true");
              break;
            case "User":
              url.searchParams.append("isGroup", "false");
              break;
          }
        }

        if (uuid !== undefined && uuid.length > 0)
          url.searchParams.append("uuid", uuid);

        return httpGetJson(url.href);
      },
      [stroomBaseServiceUrl, httpGetJson]
    ),
    findUsersInGroup: useCallback(
      (groupUuid: string) =>
        httpGetJson(
          `${stroomBaseServiceUrl}/users/v1/usersInGroup/${groupUuid}`,
          {},
          false
        ),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    removeUserFromGroup: useCallback(
      (userUuid: string, groupUuid: string) =>
        httpDeleteEmptyResponse(
          `${stroomBaseServiceUrl}/users/v1/${userUuid}/${groupUuid}`
        ),
      [httpDeleteEmptyResponse]
    )
  };
};

export default useApi;