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
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import ResizeBottomRight from "../ResizeHandle/ResizeBottomRight";
import * as ReactModal from "react-modal";

interface ContentProps {
  width: number;
  height: number;
  header: JSX.Element;
  content: JSX.Element;
  actions: JSX.Element;
}

// const styleOverrides = {
//   overlay: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   content: {
//     bottom: "unset",
//     overflow: "visible",
//     padding: 0,
//     border: "none",
//     borderRadius: 0,
//     position: "static",
//     background: "none",
//     pointerEvents: "none",
//   },
// };

const ResizableThemedModal: React.FunctionComponent<
  ContentProps & ReactModal.Props
> = ({ width, height, header, content, actions, ...rest }) => {
  const { theme } = useTheme();

  return (
    <Modal
      className={`themed-modal ${theme}`}
      // className={`themed-modal`}
      overlayClassName={`themed-modal__overlay`}
      {...rest}
      // style={reactModalOptions}
    >
      <Draggable handle=".themed-modal__header" bounds="body">
        <div className="themed-modal__container">
          <ResizableBox
            className="custom-box box"
            width={width}
            height={height}
            handle={
              <span className="custom-handle custom-handle-se">
                <ResizeBottomRight />
              </span>
            }
            handleSize={[20, 20]}
          >
            <div className="themed-modal__header">{header}</div>
            <div className="themed-modal__content">{content}</div>
            <div className="themed-modal__footer__actions">{actions}</div>
          </ResizableBox>
        </div>
      </Draggable>
    </Modal>
  );
};

export default ResizableThemedModal;
