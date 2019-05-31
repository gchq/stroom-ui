import * as React from "react";

// import useRouter from "lib/useRouter";

// import {
//   useTable as useActivityGroupTable,
//   ActivityGroupNamesTable,
// } from "../../ActivityGroups/ActivityGroupNamesTable";
// import {
//   useActivityGroupModalPicker,
//   ActivityGroupModalPicker,
// } from "../../ActivityGroups/ActivityGroupPickerDialog";
// import ThemedConfirm, {
//   useDialog as useConfirmDialog,
// } from "components/ThemedConfirm";

// import useActivityConfig from "../api/useActivityConfig";
import parse, { HTMLReactParserOptions, DomElement } from "html-react-parser";
import parser from "style-to-object";
// import domToReact from "html-react-parser/lib/dom-to-react";
import { Prop, Activity } from "../api/types";
// import ConfirmPasswordResetEmailContainer from "components/password/ConfirmPasswordResetEmail/ConfirmPasswordResetEmailContainer";
// import { acequire } from "brace";

interface Props {
  activity: Activity;
  editorTitle: string;
  editorBody: string;
  onPropChange?: (prop: Prop) => any;
}

const getId = ({ attribs: { id } }: DomElement): string => {
  if (id) {
    const trimmed: string = id.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }
  return null;
};

const getName = ({ attribs: { name } }: DomElement): string => {
  if (name) {
    const trimmed: string = name.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }
  return null;
};

const getValue = (activity: Activity, propertyId: string): string => {
  if (activity && activity.properties) {
    const prop: Prop = activity.properties.find(p => p.id === propertyId);
    if (prop) {
      return prop.value;
    }
  }
  return null;
};

const isShowInSelection = ({
  attribs: { showInSelection },
}: DomElement): boolean => {
  if (showInSelection) {
    const trimmed: string = showInSelection.trim();
    if (trimmed.length > 0) {
      return trimmed.toLowerCase() !== "false";
    }
  }
  return true;
};

const isShowInList = ({ attribs: { showInList } }: DomElement): boolean => {
  if (showInList) {
    const trimmed: string = showInList.trim();
    if (trimmed.length > 0) {
      return trimmed.toLowerCase() !== "false";
    }
  }
  return true;
};

const createProp = (element: DomElement): Prop => {
  const prop: Prop = {
    id: getId(element),
    name: getName(element),
    value: undefined,
    showInSelection: isShowInSelection(element),
    showInList: isShowInList(element),
  };

  if (!prop.id) {
    // Fall back to using name.
    prop.id = prop.name;
  }

  if (!prop.name) {
    // Fall back to using id.
    prop.name = prop.id;
  }

  return prop;
};

interface FormState {
  [s: string]: string;
}

interface FocusStealingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  takesFocus: boolean;
}

interface FocusStealingTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  takesFocus: boolean;
}

interface FocusStealingSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  takesFocus: boolean;
}

const useFocusSteal = <T extends HTMLElement>(
  takesFocus: boolean,
): React.MutableRefObject<T> => {
  const inputRef = React.useRef<T>();

  React.useEffect(() => {
    if (takesFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [takesFocus]);

  return inputRef;
};

const FocusStealingInput: React.FunctionComponent<FocusStealingInputProps> = ({
  takesFocus,
  ...props
}) => <input {...props} ref={useFocusSteal<HTMLInputElement>(takesFocus)} />;

const FocusStealingTextArea: React.FunctionComponent<
  FocusStealingTextAreaProps
> = ({ takesFocus, ...props }) => (
  <textarea {...props} ref={useFocusSteal<HTMLTextAreaElement>(takesFocus)} />
);

const FocusStealingSelect: React.FunctionComponent<
  FocusStealingSelectProps
> = ({ takesFocus, ...props }) => (
  <select {...props} ref={useFocusSteal<HTMLSelectElement>(takesFocus)} />
);

const ActivityEditor: React.FunctionComponent<Props> = ({
  activity,
  editorTitle,
  editorBody,
  onPropChange,
}) => {
  // const { history } = useRouter();
  // const activityConfig = useActivityConfig();

  const doneFocus = React.useRef(false);
  doneFocus.current = false;

  const options: HTMLReactParserOptions = React.useMemo(
    () => ({
      replace: (
        element: DomElement,
      ): React.ReactElement | object | undefined | false => {
        const { attribs } = element;
        if (attribs) {
          const style: React.CSSProperties =
            attribs && attribs.style && parser(attribs.style);

          let takesFocus = false; //attribs.takefocus === "true";
          if (!doneFocus) {
            takesFocus = true;
            doneFocus.current = true;
          }

          const customAttribs = {
            ...attribs,
            style,
            takesFocus,
          };

          const elemName = element.name.toLowerCase();
          if ("input" === elemName) {
            const prop: Prop = createProp(element);
            const value: string = getValue(activity, prop.id);
            const type: string = attribs.type.toLowerCase();

            if ("checkbox" === type) {
              return (
                <FocusStealingInput
                  type="checkbox"
                  onChange={({ target: { checked } }) =>
                    onPropChange({ ...prop, value: checked.toString() })
                  }
                  checked={value !== "false"}
                  defaultChecked={value !== "false"}
                  {...customAttribs}
                />
              );
            } else if ("radio" === type) {
              return (
                <FocusStealingInput
                  type="radio"
                  onChange={({ target: { checked } }) =>
                    onPropChange({ ...prop, value: checked.toString() })
                  }
                  checked={value !== "false"}
                  defaultChecked={value !== "false"}
                  {...customAttribs}
                />
              );
            } else {
              return (
                <FocusStealingInput
                  onChange={({ target: { value } }) =>
                    onPropChange({ ...prop, value })
                  }
                  value={value}
                  {...customAttribs}
                />
              );
            }
          } else if ("textarea" === elemName) {
            const prop: Prop = createProp(element);
            const value: string = getValue(activity, prop.id);

            return (
              <FocusStealingTextArea
                onChange={({ target: { value } }) =>
                  onPropChange({ ...prop, value })
                }
                value={value}
                {...customAttribs}
              />
            );
          } else if ("select" === elemName) {
            const prop: Prop = createProp(element);
            const value: string = getValue(activity, prop.id);

            return (
              <FocusStealingSelect
                onChange={({ target: { value } }) =>
                  onPropChange({ ...prop, value })
                }
                value={value}
                {...customAttribs}
              />
            );
          }
        }

        return undefined;
      },
    }),
    [activity, onPropChange],
  );

  //     } else if ("text".equalsIgnoreCase(tagName)) {
  //         // Focus the first input.
  //         if (!doneFocus) {
  //             doneFocus = true;
  //             element.focus();
  //         }

  //         final Prop prop = createProp(element);
  //         final String value = getValue(activity, prop.getId());
  //         if (value != null) {
  //             final InputElement inputElement = element.cast();
  //             inputElement.setValue(value);
  //         }
  //     } else if ("textarea".equalsIgnoreCase(tagName)) {
  //         // Focus the first input.
  //         if (!doneFocus) {
  //             doneFocus = true;
  //             element.focus();
  //         }

  //         final Prop prop = createProp(element);
  //         final String value = getValue(activity, prop.getId());
  //         if (value != null) {
  //             final TextAreaElement inputElement = element.cast();
  //             inputElement.setValue(value);
  //         }
  //     } else if ("select".equalsIgnoreCase(tagName)) {
  //         // Focus the first input.
  //         if (!doneFocus) {
  //             doneFocus = true;
  //             element.focus();
  //         }

  //         final Prop prop = createProp(element);
  //         final String value = getValue(activity, prop.getId());
  //         if (value != null) {
  //             final SelectElement selectElement = element.cast();
  //             selectElement.setValue(value);
  //         }
  //     }

  // boolean doneFocus = false;

  // final List<Element> inputElements = new ArrayList<>();
  // findInputElements(getView().getHtml().getElement().getChildNodes(), inputElements);

  // for (final Element element : inputElements) {
  //     final String tagName = element.getTagName();
  //     if ("input".equalsIgnoreCase(tagName)) {
  //         // Focus the first input.
  //         if (!doneFocus) {
  //             doneFocus = true;
  //             element.focus();
  //         }

  //         final Prop prop = createProp(element);
  //         final String value = getValue(activity, prop.getId());
  //         if (value != null) {
  //             final InputElement inputElement = element.cast();

  //             if ("checkbox".equalsIgnoreCase(inputElement.getType()) || "radio".equalsIgnoreCase(inputElement.getType())) {
  //                 try {
  //                     inputElement.setChecked(Boolean.valueOf(value));
  //                 } catch (final RuntimeException e) {
  //                     // Ignore.
  //                 }
  //             } else {
  //                 inputElement.setValue(value);
  //             }
  //         }
  //     } else if ("text".equalsIgnoreCase(tagName)) {
  //         // Focus the first input.
  //         if (!doneFocus) {
  //             doneFocus = true;
  //             element.focus();
  //         }

  //         final Prop prop = createProp(element);
  //         final String value = getValue(activity, prop.getId());
  //         if (value != null) {
  //             final InputElement inputElement = element.cast();
  //             inputElement.setValue(value);
  //         }
  //     } else if ("textarea".equalsIgnoreCase(tagName)) {
  //         // Focus the first input.
  //         if (!doneFocus) {
  //             doneFocus = true;
  //             element.focus();
  //         }

  //         final Prop prop = createProp(element);
  //         final String value = getValue(activity, prop.getId());
  //         if (value != null) {
  //             final TextAreaElement inputElement = element.cast();
  //             inputElement.setValue(value);
  //         }
  //     } else if ("select".equalsIgnoreCase(tagName)) {
  //         // Focus the first input.
  //         if (!doneFocus) {
  //             doneFocus = true;
  //             element.focus();
  //         }

  //         final Prop prop = createProp(element);
  //         final String value = getValue(activity, prop.getId());
  //         if (value != null) {
  //             final SelectElement selectElement = element.cast();
  //             selectElement.setValue(value);
  //         }
  //     }
  // }

  // if (attribs) {
  //   if (attribs.id === "main") {
  //     return (
  //       <h1 style={{ fontSize: 42 }}>{domToReact(children, options)}</h1>
  //     );
  //   } else if (attribs.class === "prettify") {
  //     return (
  //       <span style={{ color: "hotpink" }}>
  //         {domToReact(children, options)}
  //       </span>
  //     );
  //   }
  // }

  // const { componentProps: tableProps } = useActivityGroupTable(groupNames);

  // const {
  //   selectableTableProps: { selectedItems },
  // } = tableProps;

  // const {
  //   showDialog: showRemoveDialog,
  //   componentProps: removeDialogProps,
  // } = useConfirmDialog({
  //   onConfirm: React.useCallback(() => selectedItems.forEach(removeFromGroup), [
  //     selectedItems,
  //     removeFromGroup,
  //   ]),
  //   getQuestion: React.useCallback(
  //     () => "Remove volume from selected groups?",
  //     [],
  //   ),
  //   getDetails: React.useCallback(() => selectedItems.join(", "), [
  //     selectedItems,
  //   ]),
  // });

  // const {
  //   componentProps: activityGroupPickerProps,
  //   showDialog: showActivityGroupPicker,
  // } = useActivityGroupModalPicker({
  //   onConfirm: React.useCallback((groupName: string) => addToGroup(groupName), [
  //     addToGroup,
  //   ]),
  // });

  let elements;

  if (editorBody) {
    elements = parse(editorBody, options);
  }

  return (
    // <div className="page">
    //   <div className="page__header">
    //     <IconHeader
    //       icon="tasks"
    //       text={activityConfig && activityConfig.editorTitle}
    //     />
    //     <div className="page__buttons Button__container">
    //       <Button text="Back" onClick={history.goBack} />
    //       <Button
    //         icon="save"
    //         text="Save"
    //         title="Save"
    //         disabled={!isDirty}
    //         onClick={onCreateOrUpdate}
    //       />
    //       {/* <ThemedConfirm {...removeDialogProps} /> */}
    //     </div>
    //   </div>
    //   <div className="page__search" />
    <div className="page__body page__padding">
      <div>{elements}</div>
    </div>
    // </div>
  );
};

export default ActivityEditor;
