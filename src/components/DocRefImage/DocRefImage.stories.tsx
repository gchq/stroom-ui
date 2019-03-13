import * as React from "react";

import { storiesOf } from "@storybook/react";


import DocRefImage from "./DocRefImage";

import "../../styles/main.css";

storiesOf("Doc Ref/Image", module)
  
  .add("default (large)", () => <DocRefImage docRefType="XSLT" />)
  .add("small", () => <DocRefImage size="sm" docRefType="Feed" />)
  .add("large", () => <DocRefImage size="lg" docRefType="Pipeline" />);
