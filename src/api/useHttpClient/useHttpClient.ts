import { useCallback } from "react";

import { useActionCreators as useErrorActionCreators } from "../../components/ErrorPage";

import handleStatus from "./handleStatus";
import useAppNavigation from "../../components/AppChrome/useAppNavigation";
import { useAuthenticationContext } from "../../startup/Authentication";

/**
 * A wrapper around fetch that can be used to de-duplicate GET calls to the same resources.
 * It also allows us to track all the URL's which are being requested from remote servers so that we can
 * add a status bar to the UI to indicate how the requests are going.
 *
 * @param {function} dispatch The redux dispatch funciton
 * @param {object} state The current redux state
 * @param {string} url The URL to fetch
 * @param {function} successCallback The function to call with the response if successful. Failures will be handled generically
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
  const {
    setErrorMessage,
    setHttpErrorCode,
    setStackTrace
  } = useErrorActionCreators();
  const { goToError } = useAppNavigation();

  const httpGetJson = useCallback(
    <T>(
      url: string,
      options: {
        [s: string]: any;
      } = {},
      forceGet: boolean = true // default to true, take care with settings this to false, old promises can override the updated picture with old information if this is mis-used
    ): Promise<T | void> => {
      // If we do not have an entry in the cache or we are forcing GET, create a new call
      if (!cache[url] || forceGet) {
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
          .catch(error => {
            setErrorMessage(error.message);
            setStackTrace(error.stack);
            setHttpErrorCode(error.status);
            goToError();
          });
      }

      return cache[url];

      // console.groupEnd();
    },
    [setErrorMessage, setHttpErrorCode, setStackTrace]
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
          .catch(error => {
            setErrorMessage(error.message);
            setStackTrace(error.stack);
            setHttpErrorCode(error.status);
            goToError();
          });
      },
      [setErrorMessage, setStackTrace, setHttpErrorCode]
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
          .catch(error => {
            setErrorMessage(error.message);
            setStackTrace(error.stack);
            setHttpErrorCode(error.status);
            goToError();
          });
      },
      [setErrorMessage, setStackTrace, setHttpErrorCode]
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
