import useApi from "./useApi";
import { useEffect, useState } from "react";
import { DataSourceType } from "../../types";

const defaultDataSource: DataSourceType = {
  fields: []
};

export default (): DataSourceType => {
  const [dataSource, setDataSource] = useState<DataSourceType | undefined>(
    undefined
  );
  const { fetchDataSource } = useApi();

  useEffect(() => {
    fetchDataSource().then(setDataSource);
  }, [fetchDataSource, setDataSource]);

  return dataSource || defaultDataSource;
};
