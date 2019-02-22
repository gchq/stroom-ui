import { IndexDoc, IndexField } from "../../../types";
import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";

export const generateTestIndexField = (): IndexField => ({
  name: loremIpsum({ count: 2, units: "words" })
});

export const generateTestIndex = (): IndexDoc => ({
  type: "Index",
  uuid: uuidv4(),
  name: loremIpsum({ count: 2, units: "words" }),
  data: {
    fields: Array(5)
      .fill(1)
      .map(generateTestIndexField)
  }
});
