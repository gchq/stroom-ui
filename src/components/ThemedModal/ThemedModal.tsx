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

import * as React from "react";
import * as ReactModal from "react-modal";
import styled from "styled-components";

import reactModalOptions from "./reactModalOptions";
import { raisedLow } from "../../styled/ThemeStyling";

interface ContentProps {
  header: JSX.Element;
  content: JSX.Element;
  actions: JSX.Element;
}

interface Props extends ContentProps, ReactModal.Props {}

const Styled = styled.div`
  ${raisedLow}
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StyledHeader = styled.header`
  ${raisedLow}
  padding: 10px;
`;
const StyledContent = styled.div`
  ${raisedLow}
  padding: 0 20px 0 20px;
`;
const StyledFooterActions = styled.div`
  ${raisedLow}
  border-top: 1px solid lightgray;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
`;

/**
 * A themed modal is required because Semantic UI modals are mounted
 * outside the application's root div. This means it won't inherit the
 * 'theme-dark' or 'theme-light' class name. We can add it here easily
 * enough.
 * property, or not.
 */
const ThemedModal = ({ header, content, actions, ...rest }: Props) => {
  return (
    <ReactModal {...rest} style={reactModalOptions}>
      <Styled>
        <StyledHeader>{header}</StyledHeader>
        <StyledContent>{content}</StyledContent>
        <StyledFooterActions>{actions}</StyledFooterActions>
      </Styled>
    </ReactModal>
  );
};

export default ThemedModal;
