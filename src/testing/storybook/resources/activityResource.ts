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
  // Get the configuration for activities.
  server
    .get(`${stroomBaseServiceUrl}/activity/v1/config`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      res.json(testCache.data!.activity.config);
    });

  // Get the current activity for the summary.
  server
    .get(`${stroomBaseServiceUrl}/activity/v1/current`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      res.json(testCache.data!.activity.currentActivity);
    });

  // Get activity list.
  server
    .get(`${stroomBaseServiceUrl}/activity/v1`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      res.json(testCache.data!.activity.activityList);
    });

  // Get By ID
  server
    .get(`${stroomBaseServiceUrl}/activity/v1/:activityId`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      let activityId: string = req.params.activityId;
      let activity = testCache.data!.activity.activityList.find(
        a => `${a.id}` === activityId,
      );
      if (!!activity) {
        res.json(activity);
      } else {
        res.sendStatus(404);
      }
    });
};

export default resourceBuilder;
