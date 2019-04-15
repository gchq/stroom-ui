/* eslint camelcase: ["error", {properties: "never"}]*/
/*
 * Copyright 2019 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useCallback } from "react";
import { useConfig } from 'src/startup/config';
import { User } from "../types";
import useHttpClient from "src/lib/useHttpClient";

interface Api {
  add: (user: User) => Promise<void>;
  change: (user: User) => Promise<void>;
  fetch: (userId: string) => Promise<User[]>;
  fetchCurrentUser: () => Promise<User[]>;
  remove: (userId: string) => Promise<void>;
  search: () => Promise<User[]>;
}

export const useApi = (): Api => {
  const {
    httpPutEmptyResponse,
    httpGetJson,
    httpPostJsonResponse,
    httpDeleteEmptyResponse
  } = useHttpClient();
  const { userServiceUrl } = useConfig();
  if (!userServiceUrl) throw Error("Configuration not ready or misconfigured!");

  const change = useCallback(user => {
    const url = `${userServiceUrl}/${user.id}`;
    return httpPutEmptyResponse(url, {
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        comments: user.comments,
        state: user.state,
        neverExpires: user.neverExpires,
        forcePasswordChange: user.forcePasswordChange,
      }),
    });
  }, []);

  const add = useCallback(user => {
    const url = userServiceUrl;
    return httpPostJsonResponse(url, {
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        comments: user.comments,
        state: user.state,
        neverExpires: user.neverExpires,
        forcePasswordChange: user.forcePasswordChange,
      }),
    });
  }, []);

  /**
   * Delete user
   */
  const remove = useCallback((userId: string) => {
    const url = `${userServiceUrl}/${userId}`;
    return httpDeleteEmptyResponse(url, {});
  }, []);

  /**
   * Fetch a user
   */
  const fetch = useCallback((userId: string) => {
    const url = `${userServiceUrl}/${userId}`;
    return httpGetJson(url);
  }, []);

  const fetchCurrentUser = useCallback(() => {
    const url = `${userServiceUrl}/me`;
    return httpGetJson(url);
  }, []);

  const search = useCallback(() => {
    const url = `${
      userServiceUrl
      }/?fromEmail=&usersPerPage=100&orderBy=id`;
    return httpGetJson(url);
  }, []);

  return {
    add,
    fetch,
    fetchCurrentUser,
    remove,
    change,
    search
  };
};

export default useApi;
