import { DocumentPermissions } from "../../types";
import { Action } from "redux";
import {
  genUseActionCreators,
  prepareReducer
} from "../../lib/redux-actions-ts";
import { StoreState } from "./types";

const defaultState: StoreState = {
  permissionsByDocType: {},
  permissions: []
};

const PERMISSION_NAMES_FOR_DOC_TYPE_RECEIVED =
  "PERMISSION_NAMES_FOR_DOC_TYPE_RECEIVED";
const PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED =
  "PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED";
const PERMISSIONS_FOR_DOCUMENT_RECEIVED = "PERMISSIONS_FOR_DOCUMENT_RECEIVED";
const DOCUMENT_PERMISSION_ADDED = "DOCUMENT_PERMISSION_ADDED";
const DOCUMENT_PERMISSION_REMOVED = "DOCUMENT_PERMISSION_REMOVED";
const DOCUMENT_PERMISSIONS_CLEARED = "DOCUMENT_PERMISSIONS_CLEARED";

interface PermissionNamesForDocTypeReceivedAction
  extends Action<"PERMISSION_NAMES_FOR_DOC_TYPE_RECEIVED"> {
  docType: string;
  permissionNames: Array<string>;
}

interface PermissionsForDocumentForUserReceivedAction
  extends Action<"PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED"> {
  docRefUuid: string;
  userUuid: string;
  permissionNames: Array<string>;
}

interface PermissionsForDocumentReceivedAction
  extends Action<"PERMISSIONS_FOR_DOCUMENT_RECEIVED"> {
  docRefUuid: string;
  documentPermissions: DocumentPermissions;
}

interface DocumentPermissionAction {
  docRefUuid: string;
  userUuid: string;
  permissionName: string;
}

interface DocumentPermissionAddedAction
  extends Action<"DOCUMENT_PERMISSION_ADDED">,
    DocumentPermissionAction {}
interface DocumentPermissionRemovedAction
  extends Action<"DOCUMENT_PERMISSION_REMOVED">,
    DocumentPermissionAction {}
interface DocumentPermissionsClearedAction
  extends Action<"DOCUMENT_PERMISSIONS_CLEARED"> {
  docRefUuid: string;
}

export const useActionCreators = genUseActionCreators({
  permissionNamesForDocTypeReceived: (
    docType: string,
    permissionNames: Array<string>
  ): PermissionNamesForDocTypeReceivedAction => ({
    type: PERMISSION_NAMES_FOR_DOC_TYPE_RECEIVED,
    docType,
    permissionNames
  }),
  permissionsForDocumentForUserReceived: (
    docRefUuid: string,
    userUuid: string,
    permissionNames: Array<string>
  ): PermissionsForDocumentForUserReceivedAction => ({
    type: PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED,
    docRefUuid,
    userUuid,
    permissionNames
  }),
  permissionsForDocumentReceived: (
    docRefUuid: string,
    documentPermissions: DocumentPermissions
  ): PermissionsForDocumentReceivedAction => ({
    type: PERMISSIONS_FOR_DOCUMENT_RECEIVED,
    docRefUuid,
    documentPermissions
  }),
  documentPermissionAdded: (
    docRefUuid: string,
    userUuid: string,
    permissionName: string
  ): DocumentPermissionAddedAction => ({
    type: DOCUMENT_PERMISSION_ADDED,
    docRefUuid,
    userUuid,
    permissionName
  }),
  documentPermissionRemoved: (
    docRefUuid: string,
    userUuid: string,
    permissionName: string
  ): DocumentPermissionRemovedAction => ({
    type: DOCUMENT_PERMISSION_REMOVED,
    docRefUuid,
    userUuid,
    permissionName
  }),
  documentPermissionsCleared: (
    docRefUuid: string
  ): DocumentPermissionsClearedAction => ({
    type: DOCUMENT_PERMISSIONS_CLEARED,
    docRefUuid
  })
});

export const reducer = prepareReducer(defaultState)
  .handleAction<PermissionNamesForDocTypeReceivedAction>(
    PERMISSION_NAMES_FOR_DOC_TYPE_RECEIVED,
    (state = defaultState, { docType, permissionNames }) => ({
      ...state,
      permissionsByDocType: {
        ...state.permissionsByDocType,
        [docType]: permissionNames
      }
    })
  )
  .handleAction<PermissionsForDocumentReceivedAction>(
    PERMISSIONS_FOR_DOCUMENT_RECEIVED,
    (state = defaultState, { docRefUuid, documentPermissions }) => ({
      ...state,
      permissions: Object.entries(documentPermissions.byUser)
        .map(d => ({
          userUuid: d[0],
          permissionNames: d[1]
        }))
        .map(({ userUuid, permissionNames }) => ({
          docRefUuid,
          userUuid,
          permissionNames
        }))
    })
  )
  .handleAction<PermissionsForDocumentForUserReceivedAction>(
    PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED,
    (state = defaultState, { docRefUuid, userUuid, permissionNames }) => ({
      ...state,
      permissions: state.permissions
        .filter(p => !(p.docRefUuid === docRefUuid && p.userUuid === userUuid))
        .concat([
          {
            docRefUuid,
            userUuid,
            permissionNames
          }
        ])
    })
  )
  .handleAction<DocumentPermissionAddedAction>(
    DOCUMENT_PERMISSION_ADDED,
    (state = defaultState, { docRefUuid, userUuid, permissionName }) => ({
      ...state,
      permissions: state.permissions.map(p => {
        if (p.docRefUuid === docRefUuid && p.userUuid === userUuid) {
          return {
            docRefUuid,
            userUuid,
            permissionNames: p.permissionNames.concat([permissionName])
          };
        } else {
          return p;
        }
      })
    })
  )
  .handleAction<DocumentPermissionRemovedAction>(
    DOCUMENT_PERMISSION_REMOVED,
    (state = defaultState, { docRefUuid, userUuid, permissionName }) => ({
      ...state,
      permissions: state.permissions.map(p => {
        if (p.docRefUuid === docRefUuid && p.userUuid === userUuid) {
          return {
            docRefUuid,
            userUuid,
            permissionNames: p.permissionNames.filter(
              _p => _p !== permissionName
            )
          };
        } else {
          return p;
        }
      })
    })
  )
  .handleAction<DocumentPermissionsClearedAction>(
    DOCUMENT_PERMISSIONS_CLEARED,
    (state = defaultState, { docRefUuid }) => ({
      ...state,
      permissions: state.permissions.filter(p => p.docRefUuid !== docRefUuid)
    })
  )

  .getReducer();
