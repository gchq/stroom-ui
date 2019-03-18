import * as React from "react";
import { StyleProps, StroomIcon } from "../../styled/StroomIcon";

interface Props extends StyleProps {
  icon: string;
  className?: string;
}

const ElementImage = ({ icon, ...rest }: Props) => (
  <StroomIcon
    {...rest}
    alt={`element icon ${icon}`}
    src={require(`../../images/elements/${icon}`)}
  />
);

export default ElementImage;
