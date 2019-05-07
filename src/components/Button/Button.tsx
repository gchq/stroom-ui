/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { ButtonProps, ButtonAppearance, ButtonAction } from "./types";

export const Button = ({
  text,
  icon,
  className: rawClassName,
  groupPosition,
  appearance,
  action,
  selected,
  disabled,
  type,
  size,
  ...rest
}: ButtonProps) => {
  const className = React.useMemo(() => {
    let classNames = ["button"];

    if (rawClassName) classNames.push(rawClassName);
    if (groupPosition) classNames.push(groupPosition);

    // Set the base button class.
    classNames.push("button__base");
    // Set the general button styling class unless this is an icon button.
    if (appearance !== ButtonAppearance.Icon) classNames.push("button");

    // Get the style name (contained by default).
    let appearanceName = "button__contained";
    if (appearance) {
      switch (+appearance) {
        case ButtonAppearance.Normal: {
          appearanceName = "button__contained";
          break;
        }
        case ButtonAppearance.Icon: {
          appearanceName = "button__icon";
          break;
        }
        case ButtonAppearance.Outline: {
          appearanceName = "button__outline";
          break;
        }
        case ButtonAppearance.Text: {
          appearanceName = "button__text-only";
          break;
        }
        default:
          break;
      }
    }
    // Set the style name.
    classNames.push(appearanceName);

    // Get the color (none by default);
    let actionName;
    if (action) {
      switch (+action) {
        case ButtonAction.Primary: {
          actionName = appearanceName + "__primary";
          break;
        }
        case ButtonAction.Secondary: {
          actionName = appearanceName + "__secondary";
          break;
        }
        default:
          break;
      }
    }
    if (actionName) {
      // Set the color.
      classNames.push(actionName);
    }

    if (text) classNames.push("has-text");
    if (selected) classNames.push("selected");
    if (disabled) classNames.push("disabled");

    return classNames.join(" ");
  }, [
    rawClassName,
    groupPosition,
    appearance,
    action,
    text,
    selected,
    disabled,
  ]);

  let fontAwesomeSize: SizeProp = React.useMemo(() => {
    switch (size) {
      case "small":
        return "sm";
      case "medium":
        return "1x";
      case "large":
        return "lg";
      case "xlarge":
        return "2x";
      default:
        fontAwesomeSize = "1x";
    }
    return "lg";
  }, [size]);

  return (
    <button className={className} type={type} {...rest}>
      {icon ? (
        <FontAwesomeIcon size={fontAwesomeSize} icon={icon} />
      ) : (
        undefined
      )}
      {text && icon ? <span className="button__margin" /> : undefined}
      {text ? <span className="button__text">{text}</span> : undefined}
    </button>
  );
};

export default Button;
