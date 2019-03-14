// import { useCallback } from "react";

import { UseStreams } from "./types";
import { useActionCreators } from "../data/redux";
import useApi from "./useApi";
// import { StreamAttributeMapResult } from "../../types";

export default (): UseStreams => {
  const { search, searchWithExpression, getDetailsForSelectedRow } = useApi();
  const {
    add,
    updateStreamAttributeMaps,
    updateDetailsForSelectedRow
  } = useActionCreators();

  console.log("Stuff", {
    search,
    searchWithExpression,
    getDetailsForSelectedRow,
    add,
    updateStreamAttributeMaps,
    updateDetailsForSelectedRow
  });

  // const fetchDataSourceW = useCallback(() => {
  //   fetchDataSource().then((data: DataSourceType) =>
  //   updateDataSource(dataViewerId, data)
  // );
  // }, [fetchDataSource])

  // const searchW = useCallback(() => {
  //   search().then((data: StreamAttributeMapResult) => {
  //     if (addResults) {
  //       add(
  //         dataViewerId,
  //         data.streamAttributeMaps,
  //         data.pageResponse.total,
  //         pageSize,
  //         pageOffset
  //       );
  //     } else {
  //       updateStreamAttributeMaps(
  //         dataViewerId,
  //         data.streamAttributeMaps,
  //         data.pageResponse.total,
  //         pageSize,
  //         pageOffset
  //       );
  //     }
  //   });
  // }, [search])

  // const searchWithExpressionW = useCallback(() => {
  //   searchWithExpression().then((data: StreamAttributeMapResult) => {
  //     if (addResults) {
  //       add(
  //         dataViewerId,
  //         data.streamAttributeMaps,
  //         data.pageResponse.total,
  //         pageSize,
  //         pageOffset
  //       );
  //     } else {
  //       updateStreamAttributeMaps(
  //         dataViewerId,
  //         data.streamAttributeMaps,
  //         data.pageResponse.total,
  //         pageSize,
  //         pageOffset
  //       );
  //     }
  //   });
  // }, [searchWithExpression])

  // const getDetailsForSelectedRowW = useCallback(() => {

  //   const dataView = state.dataViewers[dataViewerId];
  //   const metaId =
  //     dataView.streamAttributeMaps &&
  //     dataView.selectedRow &&
  //     dataView.streamAttributeMaps[dataView.selectedRow]
  //       ? dataView.streamAttributeMaps[dataView.selectedRow]!.data.id
  //       : undefined;

  //     getDetailsForSelectedRow(metaId).then((data: DataRow) =>
  //     updateDetailsForSelectedRow(dataViewerId, data)
  //   );
  // }, [getDetailsForSelectedRow])

  return {};
};
