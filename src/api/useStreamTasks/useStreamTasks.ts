import { useState, useCallback } from "react";

import useApi from "./useApi";
import { StreamTaskType } from "src/types";
import {
  SortByOptions,
  Directions,
  FetchParameters,
  PagedTrackerInfo,
  UseStreamTasks,
} from "./types";

const defaultPagedInfo: PagedTrackerInfo = {
  trackers: [],
  numberOfPages: 1,
  totalTrackers: 0,
};

const defaultFetchParameters: FetchParameters = {
  sortBy: SortByOptions.pipelineUuid,
  sortDirection: Directions.ascending,
  pageSize: 10,
  pageOffset: 0,
  searchCriteria: "is:incomplete ",
};

const useStreamTasks = (): UseStreamTasks => {
  const { fetchTrackers, fetchMore, setEnabled } = useApi();

  const [fetchParameters, setFetchParameters] = useState<FetchParameters>(
    defaultFetchParameters,
  );
  const { pageSize, pageOffset, sortBy } = fetchParameters;

  const [pagedTrackerInfo, setPagedTrackerInfo] = useState<PagedTrackerInfo>(
    defaultPagedInfo,
  );
  const { trackers, totalTrackers, numberOfPages } = pagedTrackerInfo;

  const updateFetchParameters = useCallback(
    (params: Partial<FetchParameters>) => {
      setFetchParameters({
        ...fetchParameters,
        ...params,
      });
    },
    [fetchParameters, setFetchParameters],
  );

  const addTrackers = useCallback(
    (streamTasks: StreamTaskType[], totalStreamTasks: number) => {
      setPagedTrackerInfo({
        trackers: trackers.concat(streamTasks),
        totalTrackers: totalStreamTasks,
        numberOfPages: Math.ceil(totalStreamTasks / pageSize),
      });
    },
    [setPagedTrackerInfo, trackers, pageSize],
  );

  const updateSort = useCallback(
    (sortBy: SortByOptions, sortDirection: Directions) => {
      updateFetchParameters({ sortBy, sortDirection });
    },
    [updateFetchParameters],
  );

  const updateTrackers = useCallback(
    (streamTasks: StreamTaskType[], totalStreamTasks: number) =>
      setPagedTrackerInfo({
        trackers: streamTasks,
        totalTrackers: totalStreamTasks,
        numberOfPages: Math.ceil(totalStreamTasks / pageSize),
      }),
    [setPagedTrackerInfo],
  );

  const updateEnabled = useCallback(
    (filterId: number, enabled: boolean) => {
      setPagedTrackerInfo({
        trackers: trackers.map((tracker, i) =>
          tracker.filterId === filterId
            ? { ...tracker, enabled: enabled }
            : tracker,
        ),
        numberOfPages,
        totalTrackers,
      });
    },
    [setPagedTrackerInfo, trackers, numberOfPages, totalTrackers],
  );

  const updateSearchCriteria = useCallback(
    (searchCriteria: string) => {
      let newSortBy: SortByOptions | undefined = sortBy;
      if (searchCriteria.includes("sort:next")) {
        newSortBy = undefined;
      }

      updateFetchParameters({
        sortBy: newSortBy,
        searchCriteria,
      });
    },
    [sortBy, setFetchParameters],
  );

  const changePage = useCallback(
    (pageOffset: number) => {
      updateFetchParameters({ pageOffset });
    },
    [updateFetchParameters],
  );

  const updatePageSize = useCallback(
    (pageSize: number) => {
      updateFetchParameters({ pageSize });
    },
    [updateFetchParameters],
  );

  const resetPaging = useCallback(() => {
    updateFetchParameters({ pageOffset: defaultFetchParameters.pageOffset });
  }, [updateFetchParameters]);

  const pageRight = useCallback(() => {
    // We don't want to page further than is possible
    const currentPageOffset = pageOffset;
    const numberOfPagesToUse = numberOfPages - 1;
    const newPageOffset =
      currentPageOffset < numberOfPagesToUse
        ? currentPageOffset + 1
        : numberOfPagesToUse;
    updateFetchParameters({
      pageOffset: newPageOffset,
    });
  }, [updateFetchParameters, pageOffset, numberOfPages]);

  const pageLeft = useCallback(() => {
    // We don't want to page further than is possible
    const newPageOffset = pageOffset > 0 ? pageOffset - 1 : 0;
    updateFetchParameters({
      pageOffset: newPageOffset,
    });
  }, [updateFetchParameters, pageOffset]);

  const fetchTrackersLocal = useCallback(() => {
    fetchTrackers(fetchParameters).then(d =>
      updateTrackers(d.streamTasks, d.totalStreamTasks),
    );
  }, [fetchParameters, fetchTrackers, updateTrackers]);

  const fetchMoreLocal = useCallback(() => {
    fetchMore(fetchParameters).then(d =>
      addTrackers(d.streamTasks, d.totalStreamTasks),
    );
  }, [fetchMore, fetchParameters]);

  const enableToggleLocal = useCallback(
    (filterId: number) => {
      const tracker = trackers.find(t => t.filterId === filterId);
      if (tracker) {
        setEnabled(filterId, !tracker.enabled).then(() =>
          updateEnabled(filterId, !tracker.enabled),
        );
      }
    },
    [setEnabled, trackers, updateEnabled],
  );

  return {
    pagedTrackerInfo,
    fetchParameters,
    updateFetchParameters,
    fetchTrackers: fetchTrackersLocal,
    fetchMore: fetchMoreLocal,
    enableToggle: enableToggleLocal,
    addTrackers,
    changePage,
    pageLeft,
    pageRight,
    resetPaging,
    updateEnabled,
    updatePageSize,
    updateSearchCriteria,
    updateSort,
    updateTrackers,
  };
};

export default useStreamTasks;
