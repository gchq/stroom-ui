import { DocumentPermissions } from "../../types";
import { Action } from "redux";
import {
  genUseActionCreators,
  prepareReducer
} from "../../lib/redux-actions-ts";

export interface StoreState {
  permissionsByDocType: {
    [docType: string]: Array<string>;
  };
  permissionsByDocUuidThenUserUuid: {
    [docUuid: string]: {
      [userUuid: string]: Array<string>;
    };
  };
}

const defaultState: StoreState = {
  permissionsByDocType: {},
  permissionsByDocUuidThenUserUuid: {}
};

const PERMISSIONS_FOR_DOC_TYPE_RECEIVED = "PERMISSIONS_FOR_DOC_TYPE_RECEIVED";
const PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED =
  "PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED";
const PERMISSIONS_FOR_DOCUMENT_RECEIVED = "PERMISSIONS_FOR_DOCUMENT_RECEIVED";
const DOCUMENT_PERMISSION_ADDED = "DOCUMENT_PERMISSION_ADDED";
const DOCUMENT_PERMISSION_REMOVED = "DOCUMENT_PERMISSION_REMOVED";
const DOCUMENT_PERMISSIONS_CLEARED = "DOCUMENT_PERMISSIONS_CLEARED";

interface PermissionsForDocTypeReceivedAction
  extends Action<"PERMISSIONS_FOR_DOC_TYPE_RECEIVED"> {
  docType: string;
  permissions: Array<string>;
}

interface PermissionsForDocumentForUserReceivedAction
  extends Action<"PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED"> {
  docRefUuid: string;
  userUuid: string;
  permissions: Array<string>;
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
  permissionsForDocTypeReceived: (
    docType: string,
    permissions: Array<string>
  ): PermissionsForDocTypeReceivedAction => ({
    type: PERMISSIONS_FOR_DOC_TYPE_RECEIVED,
    docType,
    permissions
  }),
  permissionsForDocumentForUserReceived: (
    docRefUuid: string,
    userUuid: string,
    permissions: Array<string>
  ): PermissionsForDocumentForUserReceivedAction => ({
    type: PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED,
    docRefUuid,
    userUuid,
    permissions
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
  .handleAction<PermissionsForDocTypeReceivedAction>(
    PERMISSIONS_FOR_DOC_TYPE_RECEIVED,
    (state = defaultState, { docType, permissions }) => ({
      ...state,
      permissionsByDocType: {
        ...state.permissionsByDocType,
        [docType]: permissions
      }
    })
  )
  .handleAction<PermissionsForDocumentReceivedAction>(
    PERMISSIONS_FOR_DOCUMENT_RECEIVED,
    (state = defaultState, { docRefUuid, documentPermissions }) => ({
      ...state,
      permissionsByDocUuidThenUserUuid: {
        ...state.permissionsByDocUuidThenUserUuid,
        [docRefUuid]: {
          ...documentPermissions.byUser
        }
      }
    })
  )
  .handleAction<PermissionsForDocumentForUserReceivedAction>(
    PERMISSIONS_FOR_DOCUMENT_FOR_USER_RECEIVED,
    (state = defaultState, { docRefUuid, userUuid, permissions }) => ({
      ...state,
      permissionsByDocUuid: {
        ...state.permissionsByDocUuidThenUserUuid,
        [docRefUuid]: {
          [userUuid]: permissions
        }
      }
    })
  )
  .handleAction<DocumentPermissionAddedAction>(
    DOCUMENT_PERMISSION_ADDED,
    (state = defaultState, { docRefUuid, userUuid, permissionName }) => ({
      ...state,

      permissionsByDocUuid: {
        ...state.permissionsByDocUuidThenUserUuid,
        [docRefUuid]: {
          [userUuid]: (!!state.permissionsByDocUuidThenUserUuid[docRefUuid] &&
            state.permissionsByDocUuidThenUserUuid[docRefUuid][userUuid] &&
            state.permissionsByDocUuidThenUserUuid[docRefUuid][userUuid].concat(
              [permissionName]
            )) || [permissionName]
        }
      }
    })
  )
  .handleAction<DocumentPermissionRemovedAction>(
    DOCUMENT_PERMISSION_REMOVED,
    (state = defaultState, { docRefUuid, userUuid, permissionName }) => ({
      ...state,

      permissionsByDocUuid: {
        ...state.permissionsByDocUuidThenUserUuid,
        [docRefUuid]: {
          [userUuid]:
            (!!state.permissionsByDocUuidThenUserUuid[docRefUuid] &&
              !!state.permissionsByDocUuidThenUserUuid[docRefUuid][userUuid] &&
              state.permissionsByDocUuidThenUserUuid[docRefUuid][
                userUuid
              ].filter(p => p !== permissionName)) ||
            []
        }
      }
    })
  )
  .handleAction<DocumentPermissionsClearedAction>(
    DOCUMENT_PERMISSIONS_CLEARED,
    (state = defaultState, { docRefUuid }) => ({
      ...state,

      permissionsByDocUuid: {
        ...state.permissionsByDocUuidThenUserUuid,
        [docRefUuid]: {}
      }
    })
  )

  .getReducer();
