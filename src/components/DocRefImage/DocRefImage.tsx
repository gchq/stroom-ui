import * as React from "react";
import { StyleProps, StroomIcon } from "../../styled/StroomIcon";

interface Props extends StyleProps {
  docRefType: string;
}

const DocRefImage = ({ docRefType, ...rest }: Props) => {
  if (docRefType !== "NONE") {
    return (
      <StroomIcon
        {...rest}
        alt={`doc ref icon ${docRefType}`}
        src={require(`../../images/docRefTypes/${docRefType}.svg`)}
      />
    );
  } else {
    return null;
  }
};

export default DocRefImage;
