declare module "react-resizable" {
  // interface PanelWidth {
  //   size?: string | number;
  //   minSize?: number;
  //   resize?: "fixed" | "dynamic" | "stretch";
  //   snap?: number[];
  // }

  export interface Props {
    children: React.Element<any>;
    className?: string;
    width: number;
    height: number;
    // Either a ReactElement to be used as handle, or a function returning an element that is fed the handle's location as its first argument.
    handle: ReactElement<any>; // | (resizeHandle: 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne') => ReactElement<any>;
    // If you change this, be sure to update your css
    handleSize?: [number, number] = [10, 10];
    lockAspectRatio?: boolean = false;
    // axis: 'both' | 'x' | 'y' | 'none' = 'both';
    minConstraints?: [number, number] = [10, 10];
    maxConstraints?: [number, number] = [Infinity, Infinity];
    // onResizeStop?: (e: SyntheticEvent, data: ResizeCallbackData) => any;
    // onResizeStart?: (e: SyntheticEvent, data: ResizeCallbackData) => any;
    // onResize?: ?(e: SyntheticEvent, data: ResizeCallbackData) => any;
    // draggableOpts?: ?Object;
    // resizeHandles?: ?Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'> = ['se'];
  }

  export class Resizable extends React.Component<Props> {}
  export class ResizableBox extends React.Component<Props> {}
}
