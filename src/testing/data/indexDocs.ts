import { IndexDoc, IndexField } from "src/types";
import * as uuidv4 from "uuid/v4";
import * as loremIpsum from "lorem-ipsum";

export const generateTestField = (): IndexField => ({
  fieldName: loremIpsum({ count: 2, units: "words" }),
  fieldType: "ID",
  stored: true,
  indexed: true,
  termPositions: false,
  analyzerType: "KEYWORD",
  caseSensitive: false,
  conditions: []
});

export const generate = (): IndexDoc => ({
  type: "Index",
  uuid: uuidv4(),
  name: loremIpsum({ count: 2, units: "words" }),
  data: {
    fields: [
      {
        fieldName: loremIpsum({ count: 2, units: "words" }),
        fieldType: "ID",
        stored: true,
        indexed: true,
        termPositions: false,
        analyzerType: "KEYWORD",
        caseSensitive: false,
        conditions: []
      },
      {
        fieldName: loremIpsum({ count: 2, units: "words" }),
        fieldType: "FIELD",
        stored: true,
        indexed: true,
        termPositions: false,
        analyzerType: "KEYWORD",
        caseSensitive: false,
        conditions: []
      },
      {
        fieldName: loremIpsum({ count: 2, units: "words" }),
        fieldType: "DATE_FIELD",
        stored: true,
        indexed: true,
        termPositions: false,
        analyzerType: "KEYWORD",
        caseSensitive: false,
        conditions: []
      },
      {
        fieldName: loremIpsum({ count: 2, units: "words" }),
        fieldType: "NUMERIC_FIELD",
        stored: true,
        indexed: true,
        termPositions: false,
        analyzerType: "KEYWORD",
        caseSensitive: false,
        conditions: []
      },
      {
        fieldName: loremIpsum({ count: 2, units: "words" }),
        fieldType: "FIELD",
        stored: true,
        indexed: true,
        termPositions: true,
        analyzerType: "ALPHA_NUMERIC",
        caseSensitive: false,
        conditions: []
      },
      {
        fieldName: loremIpsum({ count: 2, units: "words" }),
        fieldType: "FIELD",
        stored: true,
        indexed: true,
        termPositions: true,
        analyzerType: "ALPHA_NUMERIC",
        caseSensitive: true,
        conditions: []
      }
    ]
  }
});
