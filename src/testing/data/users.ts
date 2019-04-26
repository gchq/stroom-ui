import * as loremIpsum from "lorem-ipsum";
import { User } from "components/users/types";

export const generate: User[] = [
  {
    firstName: loremIpsum({ count: 1, units: "words" }),
    lastName: loremIpsum({ count: 1, units: "words" }),
    comments: loremIpsum({ count: 20, units: "words" }),
    email: loremIpsum({ count: 1, units: "words" }),
    password: "",
    forcePasswordChange: false,
    loginCount: 3,
    neverExpires: false,
    createdByUser: loremIpsum({ count: 1, units: "words" }),
    createdOn: "2019-01-01T12:12:12.000Z",
    state: "enabled",
  },
];
