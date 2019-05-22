import * as React from "react";
import Button from "components/Button";
import Toggle from "react-toggle";
import IconHeader from "components/IconHeader";
import { useState, useCallback } from "react";

const DataRetentionSection: React.FunctionComponent = () => {
  const [isFilteringEnabled, setFilteringEnabled] = useState(false);

  const handleCreate = useCallback(() => console.log("todo"), []);
  const handleDelete = useCallback(() => console.log("todo"), []);
  const handleEdit = useCallback(() => console.log("todo"), []);
  const handleCopy = useCallback(() => console.log("todo"), []);
  const isItemSelected = false;
  return (
    <div className="page">
      <div className="page__header">
        <IconHeader text="Data Retention Policy" icon="trash-alt" />
        <div className="page__buttons Button__container">
          <Button onClick={handleCreate} icon="plus" text="Create" />
          <Button
            disabled={isItemSelected}
            onClick={handleEdit}
            icon="edit"
            text="Edit"
          />
          <Button
            disabled={isItemSelected}
            onClick={handleCopy}
            icon="copy"
            text="Copy"
          />
          <Button
            disabled={isItemSelected}
            onClick={handleDelete}
            icon="trash"
            text="Delete"
          />
          <div className="DataRetention__header__filtering">
            <label>Show filtering</label>
            <Toggle
              icons={false}
              checked={isFilteringEnabled}
              onChange={event => setFilteringEnabled(event.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className="page__search" />
      <div className="page__body" />
    </div>
  );
};

export default DataRetentionSection;
