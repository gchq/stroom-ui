import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { Config } from "startup/config/types";
import { ResourceBuilder } from "./types";
import { Activity } from "components/Activity/api/types";

const ACTIVITY: Activity = {
  userId: "testuser",
  details: {
    properties: [
      {
        id: "prop1",
        name: "name1",
        value: "value1",
        showInSelection: true,
        showInList: true,
      },
      {
        id: "prop2",
        name: "name2",
        value: "value2",
        showInSelection: true,
        showInList: true,
      },
    ],
  },
};

const resourceBuilder: ResourceBuilder = (
  server: any,
  { stroomBaseServiceUrl }: Config,
) => {
  const resource = `${stroomBaseServiceUrl}/activity/`;

  server.get(resource).intercept((req: HttpRequest, res: HttpResponse) => {
    res.json(ACTIVITY);
  });
};

export default resourceBuilder;
