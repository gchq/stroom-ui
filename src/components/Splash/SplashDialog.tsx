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
import Button from "components/Button";
import ButtonContainer from "components/Button/ButtonContainer";
import useSplashConfig from "./api/useSplashConfig";
import parse from "html-react-parser";
import ThemedConfirm, {
  useDialog as useThemedConfirmDialog,
} from "../ThemedConfirm";
import useApi from "./api";

interface Props {
  afterAccept: () => void;
}

const SplashDialog: React.FunctionComponent<Props> = ({ afterAccept }) => {
  console.log("Rendering Splash Dialog");

  const splashConfig = useSplashConfig();

  const {
    showDialog: onRejectClick,
    componentProps: confirmDialogProps,
  } = useThemedConfirmDialog({
    getQuestion: React.useCallback(
      () => `You must accept the terms to use this system`,
      [],
    ),
    onConfirm: React.useCallback(() => {}, []),
  });

  const { acknowledgeSplash } = useApi();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [done, setDone] = React.useState<boolean>(false);

  const showDialog = React.useCallback(() => setIsOpen(true), [setIsOpen]);

  const onAccept = React.useCallback(() => {
    acknowledgeSplash(splashConfig.body, splashConfig.version).then(() => {
      setIsOpen(false);
      afterAccept();
    });
  }, [acknowledgeSplash, splashConfig, setIsOpen, afterAccept]);

  React.useEffect(() => {
    if (splashConfig && !done) {
      // If the splash screen is enabled then show it else shortcut to accept.
      console.log("done", done, SplashDialog);
      if (splashConfig.enabled) {
        showDialog();
      } else {
        afterAccept();
      }
      setDone(true);
    }
  }, [splashConfig, done, setDone, showDialog, afterAccept]);

  if (!splashConfig) {
    return null;
  }

  const { title, body, version } = splashConfig;
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

export default SplashDialog;
