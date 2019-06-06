/*
 * Copyright 2017 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use  file except in compliance with the License.
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
import { useAuthenticationContext } from "startup/Authentication";
import useConfig from "startup/config/useConfig";
import useTokens from "./useTokens";
import CreateTokenForm from "./CreateTokenForm";
import useAppNavigation from "lib/useAppNavigation";

const CreateFormContainer = () => {
  const {
    nav: { goToApiKeys },
  } = useAppNavigation();
  const { createToken } = useTokens();
  const { authBaseServiceUrl } = useConfig();
  const { idToken } = useAuthenticationContext();
  if (!authBaseServiceUrl)
    throw Error("Configuration not ready or misconfigured!");

  return (
    <CreateTokenForm
      onSubmit={createToken}
      idToken={idToken}
      userServiceUrl={`${authBaseServiceUrl}/user/v1`}
      onBack={goToApiKeys}
    />
  );
};

export default CreateFormContainer;
