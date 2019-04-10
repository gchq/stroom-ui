import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";

import { StroomUser } from "src/types";

export const adminUser: StroomUser = {
  uuid: uuidv4(),
  name: "admin",
  isGroup: false,
};

export const generateTestUser = (): StroomUser => ({
  uuid: uuidv4(),
  name: loremIpsum({ count: 3, units: "words" }),
  isGroup: false,
});

export const generateTestGroup = (): StroomUser => ({
  uuid: uuidv4(),
  name: loremIpsum({ count: 3, units: "words" }),
  isGroup: true,
});
