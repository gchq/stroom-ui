import * as React from "react";
// import PropTypes from "prop-types";

interface Props {
  pill: string;
}

/**
 * This component is just to demonstrate that the state of one component
 * can be passed as the props to another.
 * @param param0 Props
 */
export const DisplayPillChoice: React.FunctionComponent<Props> = ({ pill }) => (
  <p>
    You have chosen the <strong>{pill}</strong> pill
  </p>
);

// DisplayPillChoice.propTypes = {
//   pill: PropTypes.string.
// };

export default DisplayPillChoice;
