import * as React from "react";
import { useCallback } from "react";
import useHttpClient from "lib/useHttpClient";
import useConfig from "startup/config/useConfig";
import { Activity, ActivityConfig } from "./types";

interface UseApi {
  // Get the configuration for activities.
  getConfig: () => Promise<ActivityConfig>;

  // Get the current activity for the summary.
  getCurrentActivity: () => Promise<Activity>;
  setCurrentActivity: (activity: Activity) => Promise<Activity>;

  // Manage activities.
  getActivities: () => Promise<Activity[]>;

  // Activity CRUD
  createActivity: (activity: Activity) => Promise<Activity>;
  getActivity: (id: string) => Promise<Activity>;
  updateActivity: (activity: Activity) => Promise<Activity>;
  deleteActivity: (id: string) => Promise<void>;
}

const useApi = (): UseApi => {
  const {
    httpGetJson,
    httpPostJsonResponse,
    httpDeleteEmptyResponse,
  } = useHttpClient();
  const { stroomBaseServiceUrl } = useConfig();
  const resource = `${stroomBaseServiceUrl}/activity/v1`;
  const activityConfigUrl = `${resource}/config`;
  const currentActivityUrl = `${resource}/current`;

  return {
    getConfig: useCallback(() => httpGetJson(activityConfigUrl), [
      activityConfigUrl,
      httpGetJson,
    ]),

    getCurrentActivity: useCallback(() => httpGetJson(currentActivityUrl), [
      currentActivityUrl,
      httpGetJson,
    ]),
    setCurrentActivity: useCallback(
      (activity: Activity) =>
        httpPostJsonResponse(currentActivityUrl, {
          body: JSON.stringify(activity),
        }),
      [currentActivityUrl, httpPostJsonResponse],
    ),

    getActivities: React.useCallback(() => httpGetJson(resource), [
      resource,
      httpGetJson,
    ]),

    createActivity: React.useCallback(
      (activity: Activity) =>
        httpPostJsonResponse(resource, {
          body: JSON.stringify(activity),
        }),
      [resource, httpPostJsonResponse],
    ),
    getActivity: React.useCallback(
      (id: string) => httpGetJson(`${resource}/${id}`),
      [resource, httpGetJson],
    ),
    updateActivity: React.useCallback(
      (activity: Activity) =>
        httpPostJsonResponse(`${resource}/${activity.id}`, {
          body: JSON.stringify(activity),
        }),
      [resource, httpPostJsonResponse],
    ),
    deleteActivity: React.useCallback(
      (id: string) => httpDeleteEmptyResponse(`${resource}/${id}`),
      [resource, httpDeleteEmptyResponse],
    ),
  };
};

export default useApi;
