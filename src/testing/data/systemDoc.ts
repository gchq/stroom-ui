import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";
import { SystemDoc } from "src/api/useDocumentApi/types/system";

export const generate = (): SystemDoc => ({
  type: "System",
  uuid: uuidv4(),
  name: loremIpsum({ count: 2, units: "words" }),
});
