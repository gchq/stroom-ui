/*
 * Copyright 2018 Crown Copyright
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

import { useTheme } from "lib/useTheme/useTheme";
import * as React from "react";
import * as Modal from "react-modal";
import * as ReactModal from "react-modal";

interface ContentProps {
  header: JSX.Element;
  content: JSX.Element;
  actions: JSX.Element;
  width?: string;
  height?: string;
}

const ThemedModal: React.FunctionComponent<ContentProps & ReactModal.Props> = ({
  header,
  content,
  actions,
  width,
  height,
  ...rest
}) => {
  const { theme } = useTheme();

  const style = {
    width: width,
    height: height,
  };

  return (
    <Modal
      className={`themed-modal ${theme}`}
      overlayClassName={`themed-modal__overlay`}
      {...rest}
    >
      <div className="themed-modal__container" style={style}>
        <div className="themed-modal__header">{header}</div>
        <div className="themed-modal__content">{content}</div>
        <div className="themed-modal__footer__actions">{actions}</div>
      </div>
    </Modal>
  );
};

export default ThemedModal;
