import { useCallback } from "react";

import useHttpClient from "../useHttpClient";
import { User } from "../../types";
import { IsGroup } from "./types";
import useGetStroomBaseServiceUrl from "../useGetStroomBaseServiceUrl";

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
  const getStroomBaseServiceUrl = useGetStroomBaseServiceUrl();
  const {
    httpGetJson,
    httpPostJsonResponse,
    httpDeleteEmptyResponse,
    httpPutEmptyResponse
  } = useHttpClient();

  return {
    fetchUser: useCallback(
      (userUuid: string): Promise<User> =>
        httpGetJson(
          `${getStroomBaseServiceUrl()}/users/v1/${userUuid}`,
          {},
          false
        ),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    addUserToGroup: useCallback(
      (userUuid: string, groupUuid: string) =>
        httpPutEmptyResponse(
          `${getStroomBaseServiceUrl()}/users/v1/${userUuid}/${groupUuid}`
        ),
      [getStroomBaseServiceUrl, httpPutEmptyResponse]
    ),
    createUser: useCallback(
      (name: string, isGroup: boolean) =>
        httpPostJsonResponse(`${getStroomBaseServiceUrl()}/users/v1`, {
          body: JSON.stringify({
            name,
            isGroup
          })
        }),
      [getStroomBaseServiceUrl, httpPostJsonResponse]
    ),
    deleteUser: useCallback(
      (uuid: string) =>
        httpDeleteEmptyResponse(
          `${getStroomBaseServiceUrl()}/users/v1/${uuid}`
        ),
      [getStroomBaseServiceUrl, httpDeleteEmptyResponse]
    ),
    findGroupsForUser: useCallback(
      (userUuid: string) =>
        httpGetJson(
          `${getStroomBaseServiceUrl()}/users/v1/groupsForUser/${userUuid}`,
          {},
          false
        ),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    findUsers: useCallback(
      (name?: string, isGroup?: "Group" | "User", uuid?: string) => {
        var url = new URL(`${getStroomBaseServiceUrl()}/users/v1`);
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
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    findUsersInGroup: useCallback(
      (groupUuid: string) =>
        httpGetJson(
          `${getStroomBaseServiceUrl()}/users/v1/usersInGroup/${groupUuid}`,
          {},
          false
        ),
      [getStroomBaseServiceUrl, httpGetJson]
    ),
    removeUserFromGroup: useCallback(
      (userUuid: string, groupUuid: string) =>
        httpDeleteEmptyResponse(
          `${getStroomBaseServiceUrl()}/users/v1/${userUuid}/${groupUuid}`
        ),
      [httpDeleteEmptyResponse]
    )
  };
};

export default useApi;
