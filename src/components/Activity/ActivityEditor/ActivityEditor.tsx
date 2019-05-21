import * as React from "react";

import IconHeader from "components/IconHeader";
import Button from "components/Button";
import useRouter from "lib/useRouter";
import useActivity from "../api/useActivity";
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
import Loader from "components/Loader";
import useActivityConfig from "../api/useActivityConfig";
import parse, { HTMLReactParserOptions, DomElement } from "html-react-parser";
import domToReact from "html-react-parser/lib/dom-to-react";
import { Prop, Activity } from "../api/types";
import ConfirmPasswordResetEmailContainer from "components/password/ConfirmPasswordResetEmail/ConfirmPasswordResetEmailContainer";
import { acequire } from "brace";

interface Props {
  activityId: string;
}

const getId = (element: DomElement): string => {
  const id: string = element.attribs.id;
  if (id) {
    const trimmed: string = id.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }
  return null;
};

const getName = (element: DomElement): string => {
  const name: string = element.attribs.name;
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

const isShowInSelection = (element: DomElement): boolean => {
  const showInSelection: string = element.attribs.showInSelection;
  if (showInSelection) {
    const trimmed: string = showInSelection.trim();
    if (trimmed.length > 0) {
      return trimmed.toLowerCase() !== "false";
    }
  }
  return true;
};

const isShowInList = (element: DomElement): boolean => {
  const showInList: string = element.attribs.showInList;
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

const ActivityEditor: React.FunctionComponent<Props> = ({ activityId }) => {
  const { history } = useRouter();
  const activityConfig = useActivityConfig();
  const { activity, onPropChange } = useActivity(activityId);

  const options: HTMLReactParserOptions = {
    replace: element => {
      if (element.attribs) {
        const elemName = element.name.toLowerCase();
        if ("input" === elemName) {
          const prop: Prop = createProp(element);
          const value: string = getValue(activity, prop.id);
          const type: string = element.attribs.type.toLowerCase();

          if ("checkbox" === type) {
            return (
              <input
                type="checkbox"
                onChange={({ target: { checked } }) =>
                  onPropChange(prop.id, checked.toString())
                }
                checked={value !== "false"}
                defaultChecked={value !== "false"}
              />
            );
          } else if ("radio" === type) {
            return (
              <input
                type="radio"
                onChange={({ target: { checked } }) =>
                  onPropChange(prop.id, checked.toString())
                }
                checked={value !== "false"}
                defaultChecked={value !== "false"}
              />
            );
          } else {
            console.log("Creating input");

            return (
              <input
                onChange={({ target: { value } }) =>
                  onPropChange(prop.id, value)
                }
                value={value}
              />
            );
          }
        } else if ("textarea" === elemName) {
          const prop: Prop = createProp(element);
          const value: string = getValue(activity, prop.id);

          return (
            <textarea
              onChange={({ target: { value } }) => onPropChange(prop.id, value)}
              value={value}
              {...element.attribs}
            />
          );
        } else if ("select" === elemName) {
          const prop: Prop = createProp(element);
          const value: string = getValue(activity, prop.id);

          return (
            <select
              onChange={({ target: { value } }) => onPropChange(prop.id, value)}
              value={value}
            />
          );
        }

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
      }

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

      return undefined;
    },
  };

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

  if (activityConfig) {
    console.log(activityConfig.editorBody);
    elements = parse(activityConfig.editorBody, options);
  }

  if (!activity) {
    return <Loader message={`Loading Activity ${activityId}`} />;
  }

  return (
    <div className="page">
      <div className="page__header">
        <IconHeader icon="tasks" text={activityConfig.editorTitle} />
        <div className="page__buttons Button__container">
          <Button text="Back" onClick={history.goBack} />

          {/* <ThemedConfirm {...removeDialogProps} /> */}
        </div>
      </div>
      <div className="page__search" />
      <div className="page__body">
        <div>{elements}</div>
      </div>
      <p>{JSON.stringify(activity)}</p>
    </div>
  );
};

export default ActivityEditor;
