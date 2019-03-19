import * as React from "react";

/**
 * Most components require properties, which they then use in their render function.
 * In many cases, defining the interface privately like this is sufficient, TypeScript is able to see
 * it and apply the constraints.
 *
 * In some cases (see later examples) it becomes necessary to export the interface, and in those cases
 * I have found that we have to put those exported interfaces into a separate file (usually called types.ts)
 * This is something I'm not totally convinced about, but I encountered some TypeScript weirdness with files that
 * exported a mix of constants and interfaces.
 */
interface Props {
  title: string;
}

/**
 * This component is an example of a Function Component that simply returns it's value in one line.
 * It doesn't require the {} body or the return statement. This is a standard JavaScript feature.
 *
 * Notice how I am destructuring the props to pull the title value out. rather than having to use props.title.
 * This pattern is ubiquitous throughout our code.
 *
 * @param param0 The properties of the component. Props flow down from parent to child components.
 */
export const CustomHeader = ({ title }: Props) => (
  <h1>Custom Header - {title}</h1>
);

export default CustomHeader;
