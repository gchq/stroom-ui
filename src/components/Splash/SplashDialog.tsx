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

import * as React from "react";
import ThemedModal from "components/ThemedModal";
// import ActivityChooser from ".";
// import useActivityConfig from "../api/useSplashConfig";
// import IconHeader from "components/IconHeader";
import Button from "components/Button";
import ButtonContainer from "components/Button/ButtonContainer";
import useSplashConfig from "./api/useSplashConfig";
import parse from "html-react-parser";
// import {ReactElement} from "react";
import ThemedConfirm, {
  useDialog as useThemedConfirmDialog,
} from "../ThemedConfirm";
import useApi from "./api";

interface Props {
  afterAccept: () => void;
}

const SplashDialog: React.FunctionComponent<Props> = ({ afterAccept }) => {
  const { enabled, title, body, version } = useSplashConfig();

  const {
    showDialog: onRejectClick,
    componentProps: confirmDialogProps,
  } = useThemedConfirmDialog({
    getQuestion: React.useCallback(
      () => `You must accept the terms to use this system`,
      [],
    ),
    // getDetails: React.useCallback(() => selectedItem && selectedItem.id, [
    //   selectedItem,
    // ]),
    onConfirm: React.useCallback(() => {
      //   deleteActivity(selectedItem.id, () => refreshCurrentActivity());
    }, []),
  });

  const { acknowledgeSplash } = useApi();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const showDialog = React.useCallback(() => setIsOpen(true), [setIsOpen]);

  const onAccept = React.useCallback(() => {
    acknowledgeSplash(body, version).then(() => {
      setIsOpen(false);
      afterAccept();
    });
  }, [body, version, acknowledgeSplash, setIsOpen, afterAccept]);

  React.useEffect(() => {
    // If the splash screen is enabled then show it else shortcut to accept.
    if (enabled) {
      showDialog();
    } else {
      afterAccept();
    }
  }, [enabled, showDialog, afterAccept]);

  let elements;
  if (body) {
    elements = <div>{parse(body)}</div>;
  }

  return (
    <React.Fragment>
      <ThemedModal
        width="800px"
        height="600px"
        header={<div className="icon-header__text">{title}</div>}
        content={elements}
        actions={
          <ButtonContainer>
            <Button
              action="primary"
              appearance="contained"
              icon="check"
              text="Accept"
              onClick={onAccept}
            />
            <Button
              action="secondary"
              appearance="contained"
              icon="times"
              text="Reject"
              onClick={onRejectClick}
            />
          </ButtonContainer>
        }
        isOpen={isOpen}
      />
      <ThemedConfirm {...confirmDialogProps} />
    </React.Fragment>
  );
};

// interface UseDialog {
//   componentProps: Props;
//   showDialog: () => void;
// }
//
// export const useDialog = (): UseDialog => {
//   const [isOpen, setIsOpen] = React.useState<boolean>(false);
//
//   const showDialog = React.useCallback(() => setIsOpen(true), [setIsOpen]);
//
//   return {
//     componentProps: {
//       isOpen,
//       setIsOpen,
//     },
//     showDialog,
//   };
// };

export default SplashDialog;

// clientPropertyCache.get().onSuccess(clientProperties -> {
//   final boolean enableSplashScreen = clientProperties.getBoolean(ClientProperties.SPLASH_ENABLED, false);
//   if (enableSplashScreen) {
//     final String title = clientProperties.get(ClientProperties.SPLASH_TITLE);
//     final String body = clientProperties.get(ClientProperties.SPLASH_BODY);
//     final String version = clientProperties.get(ClientProperties.SPLASH_VERSION);
//     setHtml(body);
//     final PopupUiHandlers popupUiHandlers = new PopupUiHandlers() {
//     @Override
//     public void onHideRequest(final boolean autoClose, final boolean ok) {
//         if (ok) {
//           dispatcher.exec(new AcknowledgeSplashAction(body, version)).onSuccess(result -> hide(autoClose, ok));
//         } else {
//           AlertEvent.fireWarn(SplashPresenter.this, "You must accept the terms to use this system", null, () -> {
//             hide(autoClose, ok);
//           });
//         }
//       }
//
//     @Override
//     public void onHide(final boolean autoClose, final boolean ok) {
//         if (!ok) {
//           LogoutEvent.fire(SplashPresenter.this);
//         }
//         consumer.accept(ok);
//       }
//     };
//
// //                Scheduler.get().scheduleFixedDelay(this::testScroll, 2000);
//
//     final PopupSize popupSize = new PopupSize(800, 600, true);
//     ShowPopupEvent.fire(SplashPresenter.this, SplashPresenter.this, PopupType.ACCEPT_REJECT_DIALOG, null, popupSize, title, popupUiHandlers, true);
//
//   } else {
//     consumer.accept(true);
//   }
// });
