import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";
import { StatisticsStoreDoc } from "src/types";

export const generate = (): StatisticsStoreDoc => ({
  type: "StatisticsStore",
  uuid: uuidv4(),
  name: loremIpsum({ count: 2, units: "words" }),
});
