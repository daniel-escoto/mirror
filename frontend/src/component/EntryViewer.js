import React from "react";
import "react-calendar/dist/Calendar.css";
import { formatDateObj } from "./util";
import MDEditor from "@uiw/react-md-editor";
import '../styles.css';

function EntryViewer(props) {
  // Passed in from parent component(EntryCache)
  const date = props.date;
  const entries = props.entries;

  // Returns the journal entry for the given date, empty string if no entry found
  function getEntry(date, entries) {
    var formattedDate = formatDateObj(date);
    for (let entry in entries) {
      if (entries[entry]["date"] === formattedDate) {
        return entries[entry]["content"];
      }
    }
    return "";
  }

  return (
    <div className="mdeditor">
      <MDEditor
        value={getEntry(date, entries)}
        preview={'preview'}
        />
    </div>
  );
}

export default EntryViewer;
