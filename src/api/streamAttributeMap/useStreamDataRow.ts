import {useEffect, useState} from 'react';

import useApi from "./useApi";
import { DataRow } from '../../types';

export default (metaId: number):DataRow|undefined => {
  const [dataRow, setDataRow] = useState<DataRow | undefined>(undefined);
  const {getDetailsForSelectedRow} = useApi(); 

  useEffect(() => {
    getDetailsForSelectedRow(metaId).then(setDataRow);
  }, [metaId, setDataRow, getDetailsForSelectedRow])

  return dataRow;
}