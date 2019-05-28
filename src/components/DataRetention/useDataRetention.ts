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

import { useDataRetentionState } from "./useDataRetentionState";
import { useApi } from "./useApi";
import { useCallback } from "react";
import { DataRetentionPolicy } from "./types/DataRetentionPolicy";

const useDataRetention = () => {
  const { policy, setPolicy } = useDataRetentionState();

  const { fetchPolicy: fetchPolicyApi } = useApi();
  const fetchPolicy = useCallback(() => {
    fetchPolicyApi().then((policy: DataRetentionPolicy) => {
      setPolicy(policy);
    });
  }, [fetchPolicyApi, setPolicy]);

  return { policy, fetchPolicy };
};

export default useDataRetention;
