import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";
import { ElasticIndexDoc } from "src/components/DocumentEditors/useDocumentApi/types/elastic";

export const generate = (): ElasticIndexDoc => ({
  type: "ElasticIndex",
  uuid: uuidv4(),
  name: loremIpsum({ count: 2, units: "words" }),
  indexName: loremIpsum({ count: 1, units: "words" }),
  indexedType: loremIpsum({ count: 2, units: "words" }),
});
