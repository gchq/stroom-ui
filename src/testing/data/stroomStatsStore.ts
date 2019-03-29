import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";
import { StroomStatsStoreDoc } from "../../types";

export const generate = (): StroomStatsStoreDoc => ({
  type: "StroomStatsStore",
  uuid: uuidv4(),
  name: loremIpsum({ count: 2, units: "words" }),
});
