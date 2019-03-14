import useApi from './useApi';
import { useEffect, useState } from 'react';
import { DataSourceType } from '../../types';

export default (): DataSourceType | undefined => {
  const [dataSource, setDataSource] = useState<DataSourceType | undefined>(undefined);
  const { fetchDataSource } = useApi();

  useEffect(() => {
    fetchDataSource().then(setDataSource)
  }, [fetchDataSource, setDataSource]);

  return dataSource;
}