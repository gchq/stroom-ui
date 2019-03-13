import { useState, useCallback } from "react";

import useApi from "./useApi";
import { StreamTaskType } from "../../types";
import {
  SortByOptions,
  Directions,
  FetchParameters,
  PagedTrackerInfo,
  UseStreamTasks
} from "./types";

const defaultPagedInfo: PagedTrackerInfo = {
  trackers: [],
  numberOfPages: 1,
  totalTrackers: 0
};

const defaultFetchParameters: FetchParameters = {
  sortBy: SortByOptions.pipelineUuid,
  sortDirection: Directions.ascending,
  pageSize: 10,
  pageOffset: 0,
  searchCriteria: "is:incomplete "
};

export default (): UseStreamTasks => {
  const { fetchTrackers, fetchMore, enableToggle } = useApi();

  const [fetchParameters, setFetchParameters] = useState<FetchParameters>(
    defaultFetchParameters
  );
  const { pageSize, pageOffset, sortBy } = fetchParameters;

  const [pagedTrackerInfo, setPagedTrackerInfo] = useState<PagedTrackerInfo>(
    defaultPagedInfo
  );
  const { trackers, totalTrackers, numberOfPages } = pagedTrackerInfo;

  const [selectedTrackerId, setSelectedTrackerId] = useState<
    number | undefined
  >(undefined);

  const updateFetchParameters = useCallback(
    (params: Partial<FetchParameters>) => {
      setFetchParameters({
        ...fetchParameters,
        ...params
      });
    },
    [fetchParameters, setFetchParameters]
  );

  const addTrackers = useCallback(
    (streamTasks: Array<StreamTaskType>, totalStreamTasks: number) => {
      setPagedTrackerInfo({
        trackers: pagedTrackerInfo.trackers.concat(streamTasks),
        totalTrackers: totalStreamTasks,
        numberOfPages: Math.ceil(totalStreamTasks / pageSize)
      });
    },
    [setPagedTrackerInfo, trackers, pageSize]
  );
  const updateSort = useCallback(
    (sortBy: SortByOptions, sortDirection: Directions) => {
      updateFetchParameters({ sortBy, sortDirection });
    },
    [updateFetchParameters]
  );
  const updateTrackers = useCallback(
    (streamTasks: Array<StreamTaskType>, totalStreamTasks: number) => {
      setPagedTrackerInfo({
        trackers: streamTasks,
        totalTrackers: totalStreamTasks,
        numberOfPages: Math.ceil(totalStreamTasks / pageSize)
      });
    },
    []
  );
  const moveSelection = useCallback(
    (direction: Directions) => {
      const currentIndex = trackers.findIndex(
        tracker => tracker.filterId === selectedTrackerId
      );

      let nextSelectedId;
      if (currentIndex === -1) {
        // There's no selection so we'll leave the selection as undefined
      } else if (direction === "ascending") {
        if (currentIndex === 0) {
          nextSelectedId = trackers[currentIndex].filterId;
        } else {
          nextSelectedId = trackers[currentIndex - 1].filterId;
        }
      } else if (currentIndex === trackers.length - 1) {
        nextSelectedId = trackers[currentIndex].filterId;
      } else {
        nextSelectedId = trackers[currentIndex + 1].filterId;
      }

      setSelectedTrackerId(nextSelectedId);
    },
    [trackers, selectedTrackerId]
  );
  const updateEnabled = useCallback(
    (filterId: number, enabled: boolean) => {
      setPagedTrackerInfo({
        trackers: trackers.map((tracker, i) =>
          tracker.filterId === filterId
            ? { ...tracker, enabled: enabled }
            : tracker
        ),
        numberOfPages,
        totalTrackers
      });
    },
    [setPagedTrackerInfo, trackers, numberOfPages, totalTrackers]
  );
  const updateTrackerSelection = useCallback(
    (filterId: number) => {
      setSelectedTrackerId(filterId);
    },
    [setSelectedTrackerId]
  );
  const updateSearchCriteria = useCallback(
    (searchCriteria: string) => {
      let newSortBy: SortByOptions | undefined = sortBy;
      if (searchCriteria.includes("sort:next")) {
        newSortBy = undefined;
      }

      updateFetchParameters({
        sortBy: newSortBy,
        searchCriteria
      });
    },
    [sortBy, setFetchParameters]
  );
  const changePage = useCallback(
    (pageOffset: number) => {
      updateFetchParameters({ pageOffset });
    },
    [updateFetchParameters]
  );
  const updatePageSize = useCallback(
    (pageSize: number) => {
      updateFetchParameters({ pageSize });
    },
    [updateFetchParameters]
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
      pageOffset: newPageOffset
    });
  }, [updateFetchParameters, pageOffset, numberOfPages]);
  const pageLeft = useCallback(() => {
    // We don't want to page further than is possible
    const newPageOffset = pageOffset > 0 ? pageOffset - 1 : 0;
    updateFetchParameters({
      pageOffset: newPageOffset
    });
  }, [updateFetchParameters, pageOffset]);
  const selectFirst = useCallback(() => {
    if (trackers.length > 0) {
      setSelectedTrackerId(trackers[0].filterId);
    }
  }, [trackers, setSelectedTrackerId]);
  const selectLast = useCallback(() => {
    if (trackers.length > 0) {
      setSelectedTrackerId(trackers[trackers.length - 1].filterId);
    }
  }, [trackers, setSelectedTrackerId]);
  const selectNone = useCallback(() => setSelectedTrackerId(undefined), [
    setSelectedTrackerId
  ]);

  // const updateSelection = useCallback(() => {
  //       switch (trackerSelection) {
  //   case TrackerSelection.first:
  //     selectFirst();
  //     break;
  //   case TrackerSelection.last:
  //     selectLast();
  //     break;
  //   case TrackerSelection.none:
  //     selectNone();
  //     break;
  //   default:
  //     break;
  // }
  // }, []);

  const fetchTrackersLocal = useCallback(() => {
    fetchTrackers(fetchParameters).then(d =>
      updateTrackers(d.streamTasks, d.totalStreamTasks)
    );
  }, [fetchParameters, fetchTrackers, updateTrackers]);
  const fetchMoreLocal = useCallback(() => {
    fetchMore(fetchParameters).then(d =>
      addTrackers(d.streamTasks, d.totalStreamTasks)
    );
  }, [fetchMore, fetchParameters]);
  const enableToggleLocal = useCallback(
    (filterId: number, isCurrentlyEnabled: boolean) => {
      enableToggle(filterId, isCurrentlyEnabled).then(() =>
        updateEnabled(filterId, !isCurrentlyEnabled)
      );
    },
    [enableToggle, updateEnabled]
  );

  // httpGetJson(url).then((trackers: StreamTasksResponseType) => {
  //   updateTrackers(trackers.streamTasks, trackers.totalStreamTasks);
  //   switch (trackerSelection) {
  //     case TrackerSelection.first:
  //       selectFirst();
  //       break;
  //     case TrackerSelection.last:
  //       selectLast();
  //       break;
  //     case TrackerSelection.none:
  //       selectNone();
  //       break;
  //     default:
  //       break;
  //   }
  // });

  // httpGetJson(url).then((trackers: StreamTasksResponseType) => {
  //   addTrackers(trackers.streamTasks, trackers.totalStreamTasks);
  //   switch (trackerSelection) {
  //     case TrackerSelection.first:
  //       selectFirst();
  //       break;
  //     case TrackerSelection.last:
  //       selectLast();
  //       break;
  //     case TrackerSelection.none:
  //       selectNone();
  //       break;
  //     default:
  //       break;
  //   }
  // });

  // fetchMore() {

  //   const nextPageOffset = pageOffset + 1;
  //   changePage(nextPageOffset);
  // }

  return {
    selectedTrackerId,
    pagedTrackerInfo,
    fetchParameters,
    updateFetchParameters,
    fetchTrackers: fetchTrackersLocal,
    fetchMore: fetchMoreLocal,
    enableToggle: enableToggleLocal,
    addTrackers,
    changePage,
    moveSelection,
    pageLeft,
    pageRight,
    resetPaging,
    selectFirst,
    selectLast,
    selectNone,
    updateEnabled,
    updatePageSize,
    updateSearchCriteria,
    updateSort,
    updateTrackerSelection,
    updateTrackers
  };
};
