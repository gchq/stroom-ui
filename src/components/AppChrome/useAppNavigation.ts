import { NavigateApp } from "./types";
import useRouter from "../../lib/useRouter";
import { useMemo } from "react";
import { DocRefType } from "src/types";

export default (): NavigateApp => {
  const { history } = useRouter();
  return useMemo(
    () => ({
      goToWelcome: () => {
        history.push(`/s/welcome`);
      },
      goToDataViewer: () => {
        history.push(`/s/data`);
      },
      goToProcessing: () => {
        history.push(`/s/processing`);
      },
      goToUserSettings: () => {
        history.push(`/s/me`);
      },
      goToAuthorisationManager: () => {
        history.push(`/s/authorisationManager`);
      },
      goToAuthorisationsForUser: (userUuid: string) => {
        history.push(`/s/authorisationManager/${userUuid}`);
      },
      goToAuthorisationsForDocument: (docRefUuid: string) => {
        history.push(`/s/authorisationManager/document/${docRefUuid}`);
      },
      goToAuthorisationsForDocumentForUser: (
        docRefUuid: string,
        userUuid: string
      ) => {
        history.push(
          `/s/authorisationManager/document/${docRefUuid}/${userUuid}`
        );
      },
      goToIndexVolumes: () => {
        history.push(`/s/indexing/volumes`);
      },
      goToIndexVolume: (volumeId: string) => {
        history.push(`/s/indexing/volumes/${volumeId}`);
      },
      goToIndexVolumeGroups: () => {
        history.push(`/s/indexing/groups`);
      },
      goToIndexVolumeGroup: (groupName: string) => {
        history.push(`/s/indexing/groups/${groupName}`);
      },
      goToUsers: () => {
        history.push(`/s/users`);
      },
      goToApiKeys: () => {
        history.push(`/s/apikeys`);
      },
      goToError: () => {
        history.push(`/s/error`);
      },
      goToEditDocRefByUuid: (docRefUuid: string) => {
        history.push(`/s/doc/${docRefUuid}`);
      },
      goToEditDocRef: (docRef: DocRefType) => {
        history.push(`/s/doc/${docRef.uuid}`);
      }
    }),
    [history]
  );
};
