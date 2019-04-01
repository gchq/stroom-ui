import { useCallback } from "react";

import { useErrorReporting } from "src/components/ErrorPage";

import handleStatus from "./handleStatus";
import useAppNavigation from "src/components/AppChrome/useAppNavigation";
import { useAuthenticationContext } from "../../startup/Authentication";

/**
 * A wrapper around HTTP fetch that allows us to plop in idTokens, CORS specifications,
 * and general common stuff like that.
 */

type HttpCall = (
  url: string,
  options?: {
    [s: string]: any;
  }
) => Promise<any>;

interface HttpClient {
  httpGetJson: (
    url: string,
    options?: {
      [s: string]: any;
    },
    forceGet?: boolean
  ) => Promise<any>;
  httpPostJsonResponse: HttpCall;
  httpPutJsonResponse: HttpCall;
  httpDeleteJsonResponse: HttpCall;
  httpPatchJsonResponse: HttpCall;
  httpPostEmptyResponse: HttpCall;
  httpPutEmptyResponse: HttpCall;
  httpDeleteEmptyResponse: HttpCall;
  httpPatchEmptyResponse: HttpCall;
  clearCache: () => void;
}

// Cache GET Promises by URL -- Effectively static/global to the application
let cache = {};

export const useHttpClient = (): HttpClient => {
  const { idToken } = useAuthenticationContext();
  const { reportError } = useErrorReporting();
  const { goToError } = useAppNavigation();

  const catchImpl = useCallback(
    (error: any) => {
      reportError({
        errorMessage: error.message,
        stackTrace: error.stack,
        httpErrorCode: error.status
      });
      goToError();
    },
    [reportError, goToError]
  );

  const httpGetJson = useCallback(
    <T>(
      url: string,
      options: {
        [s: string]: any;
      } = {},
      forceGet: boolean = true // default to true, take care with settings this to false, old promises can override the updated picture with old information if this is mis-used
    ): Promise<T | void> => {
      // console.group("HTTP GET");
      // console.log("Fetching", { url, cacheKeys: Object.keys(cache) });

      // If we do not have an entry in the cache or we are forcing GET, create a new call
      if (!cache[url] || forceGet) {
        // console.log("Making a Fresh Call");
        cache[url] = fetch(url, {
          method: "get",
          mode: "cors",
          ...options,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
            ...(options ? options.headers : {})
          }
        })
          .then(handleStatus)
          .then(r => r.json())
          .catch(catchImpl);
      }
      // console.groupEnd();

      return cache[url];
    },
    [catchImpl]
  );

  const useFetchWithBodyAndJsonResponse = (method: string) =>
    useCallback(
      <T>(
        url: string,
        options?: {
          [s: string]: any;
        }
      ): Promise<T | void> => {
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
          ...(options ? options.headers : {})
        };

        return fetch(url, {
          mode: "cors",
          ...options,
          method,
          headers
        })
          .then(handleStatus)
          .then(r => r.json())
          .catch(catchImpl);
      },
      [catchImpl]
    );

  const useFetchWithBodyAndEmptyResponse = (method: string) =>
    useCallback(
      (
        url: string,
        options?: {
          [s: string]: any;
        }
      ): Promise<string | void> => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
          ...(options ? options.headers : {})
        };

        return fetch(url, {
          mode: "cors",
          ...options,
          method,
          headers
        })
          .then(handleStatus)
          .then(r => r.text())
          .catch(catchImpl);
      },
      [catchImpl]
    );

  return {
    httpGetJson,
    httpPostJsonResponse: useFetchWithBodyAndJsonResponse("post"),
    httpPutJsonResponse: useFetchWithBodyAndJsonResponse("put"),
    httpDeleteJsonResponse: useFetchWithBodyAndJsonResponse("delete"),
    httpPatchJsonResponse: useFetchWithBodyAndJsonResponse("patch"),
    httpPostEmptyResponse: useFetchWithBodyAndEmptyResponse("post"),
    httpPutEmptyResponse: useFetchWithBodyAndEmptyResponse("put"),
    httpDeleteEmptyResponse: useFetchWithBodyAndEmptyResponse("delete"),
    httpPatchEmptyResponse: useFetchWithBodyAndEmptyResponse("patch"),
    clearCache: () => {
      cache = {};
    }
  };
};

export default useHttpClient;
