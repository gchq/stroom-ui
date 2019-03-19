import * as React from "react";

/**
 * I declare the required props here, I do not necessarily have to export this interface.
 * TypeScript will still enforce it.
 */
interface Props {
  onChoice: (pill: string) => void;
}

/**
 * This component presents a couple of buttons, clicking each button will call our onChoice callback with a different value.
 *
 * Notice again the use of destructuring to get the onChoice from props.
 *
 * This function uses React.Fragment, which is a way of returning multiple components side by side without having
 * to wrap them in a <div> tag.
 *
 * In this component, the onClick handlers are being created inline, later we will do this differently because
 * as it stands successive calls to render (and they happen a LOT) will generate a new function each time.
 *
 * @param param0 The props
 */
export const PillChoice = ({ onChoice }: Props) => (
  <React.Fragment>
    <button onClick={() => onChoice("blue")}>Blue</button>
    <button onClick={() => onChoice("red")}>Red</button>
  </React.Fragment>
);

export default PillChoice;
