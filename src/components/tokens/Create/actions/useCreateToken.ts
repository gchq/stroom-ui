import { useCallback } from "react";
import useAppNavigation from "src/components/AppChrome/useAppNavigation";
import { Token } from "../../api";
import useApi from "../../api/useApi";

const useCreateToken = () => {
  const { createToken } = useApi();
  const { goToApiKey } = useAppNavigation();
  return useCallback((email: string) => {
    createToken(email).then((newToken: Token) => {
      goToApiKey(newToken.id);
    });
  }, []);
};

export default useCreateToken;
