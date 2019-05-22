import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { Config } from "startup/config/types";
import { ResourceBuilder } from "./types";
// import { Activity } from "components/Activity/api/types";
import { TestCache } from "../PollyDecorator";

// const ACTIVITY: Activity = {
//   id: "1",
//   userId: "testuser",
//   details: {
//     properties: [
//       {
//         id: "prop1",
//         name: "name1",
//         value: "value1",
//         showInSelection: true,
//         showInList: true,
//       },
//       {
//         id: "prop2",
//         name: "name2",
//         value: "value2",
//         showInSelection: true,
//         showInList: true,
//       },
//     ],
//   },
// };

// const ACTIVITY2: Activity = JSON.parse(JSON.stringify(ACTIVITY));
// ACTIVITY2.id = "2";

// const ACTIVITIES: Activity[] = [ACTIVITY, ACTIVITY2];

const resourceBuilder: ResourceBuilder = (
  server: any,
  { stroomBaseServiceUrl }: Config,
  testCache: TestCache,
) => {
  const resource = `${stroomBaseServiceUrl}/activity/v1`;
  const activityConfigUrl = `${resource}/config`;
  const currentActivityUrl = `${resource}/current`;

  // Get the configuration for activities.
  // getConfig
  server
    .get(activityConfigUrl)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      res.json(testCache.data!.activity.config);
    });

  // Get the current activity for the summary.
  // getCurrentActivity
  server
    .get(currentActivityUrl)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      res.json(testCache.data!.activity.currentActivity);
    });
  // setCurrentActivity
  server
    .post(currentActivityUrl)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      const activity = JSON.parse(req.body);
      testCache.data!.activity.currentActivity = activity;
      console.log("Setting current activity", activity);
      res.send(200);
    });

  // Manage activities.
  server.get(resource).intercept((req: HttpRequest, res: HttpResponse) => {
    console.log("Getting activities", {
      list: testCache.data!.activity.activityList,
    });

    res.json(testCache.data!.activity.activityList);
  });

  // Activity CRUD
  // createActivity
  server.post(resource).intercept((req: HttpRequest, res: HttpResponse) => {
    const activity = JSON.parse(req.body);

    let maxId = 0;
    const ids: number[] = testCache.data!.activity.activityList.map(({ id }) =>
      parseInt(id),
    );
    maxId = Math.max.apply(Math, ids);

    const savedActivity = {
      id: `${maxId + 1}`,
      ...activity,
    };

    testCache.data!.activity.activityList.push(savedActivity);
    console.log("Created new activity", savedActivity);
    res.json(savedActivity);
  });

  // getActivity
  server
    .get(`${resource}/:activityId`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      const activityId: string = req.params.activityId;
      const activity = testCache.data!.activity.activityList.find(
        a => `${a.id}` === activityId,
      );
      if (!!activity) {
        res.json(activity);
      } else {
        res.sendStatus(404);
      }
    });

  // updateActivity
  server
    .post(`${resource}/:activityId`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      const activityId: string = req.params.activityId;
      const activity = JSON.parse(req.body);

      const savedActivity = {
        version: activity.version + 1,
        ...activity,
      };

      testCache.data!.activity.activityList = testCache.data!.activity.activityList.map(
        a => {
          if (a.id === activityId) {
            return savedActivity;
          }

          return a;
        },
      );

      console.log("Updating activity", {
        savedActivity,
        list: testCache.data!.activity.activityList,
      });
      res.json(savedActivity);
    });

  // deleteActivity
  server
    .delete(`${resource}/:activityId`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      const activityId: string = req.params.activityId;

      testCache.data!.activity.activityList = testCache.data!.activity.activityList.filter(
        a => {
          return a.id !== activityId;
        },
      );

      res.status(204).send(undefined);
    });
};

export default resourceBuilder;
