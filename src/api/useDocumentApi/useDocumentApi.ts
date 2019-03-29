import { useCallback } from "react";

import { DocumentApi, ResourcesByDocType, DOCUMENT_RESOURCES } from "./types";
import { DocumentType } from "../../types";
import { useConfig } from "../../startup/config";
import useHttpClient from "../useHttpClient";

const useCommonDocumentApi = <
  T extends keyof ResourcesByDocType,
  D extends DocumentType<T>
>(
  docRefType: T
): DocumentApi<D> => {
  const { stroomBaseServiceUrl } = useConfig();
  const { httpGetJson, httpPostEmptyResponse } = useHttpClient();
  const resourcePath = DOCUMENT_RESOURCES[docRefType];

  if (!resourcePath) {
    throw new Error(
      `API for Doc Ref requested, no generic implementation ${docRefType}`
    );
  }

  return {
    fetchDocument: useCallback(
      (indexUuid: string) =>
        httpGetJson(`${stroomBaseServiceUrl}${resourcePath}${indexUuid}`),
      [stroomBaseServiceUrl, httpGetJson]
    ),
    saveDocument: useCallback(
      (docRefContents: D) =>
        httpPostEmptyResponse(
          `${stroomBaseServiceUrl}${resourcePath}${docRefContents.uuid}`,
          {
            body: docRefContents
          }
        ),
      [stroomBaseServiceUrl, httpPostEmptyResponse]
    )
  };
};

export default useCommonDocumentApi;
