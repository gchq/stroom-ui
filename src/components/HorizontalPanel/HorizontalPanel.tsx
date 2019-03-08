import * as React from "react";
import { useEffect } from "react";
import * as Mousetrap from "mousetrap";

import Button from "../Button";

interface Props {
  title: React.ReactNode;
  headerMenuItems?: React.ReactNode;
  content: React.ReactNode;
  onClose: (a?: any) => any;
  className?: string;
}

const HorizontalPanel = ({
  title,
  headerMenuItems,
  content,
  onClose,
  className
}: Props) => {
  useEffect(() => {
    Mousetrap.bind("esc", () => onClose());

    return () => {
      Mousetrap.unbind("esc");
    };
  }, []);

  return (
    <div className={`horizontal-panel ${className || ""}`}>
      <div className="horizontal-panel__header flat">
        <div className="horizontal-panel__header__title">{title}</div>
        {headerMenuItems}
        <Button icon="times" onClick={() => onClose()} />
      </div>
      <div className="horizontal-panel__content">{content}</div>
    </div>
  );
};

export default HorizontalPanel;
