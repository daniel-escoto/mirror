import axios from "axios";
import React, { useContext, useEffect } from "react";
import EntryViewer from "./EntryViewer";
import EntryDelete from "./EntryDelete";
import { getFirstDayofMonth, getLastDayofMonth } from "./util";
import { useAuth } from "../provider/AuthProvider";
import { EntryContext } from "./Home";

function EntryCache(props) {
  // Passed in from parent component(Calendar)
  const date = props.date;

  // Shared context(Created in home)
  const { setEntries } = useContext(EntryContext);
  const { entries } = useContext(EntryContext);

  // User authorization
  const { inputs } = useAuth();

  function retrieveJournalEntries(beg_date, end_date) {
    axios({
      method: "GET",
      url: "http://0.0.0.0:8081/v0/journal_entries",
      params: { startDate: beg_date, endDate: end_date, userId: inputs.uid },
    }).then((response) => {
      // console.log("Entry Chache: ");
      // console.log(response.data);
      setEntries(response.data);
    });
  }

  useEffect(() => {
    retrieveJournalEntries(getFirstDayofMonth(date), getLastDayofMonth(date));
  }, [date]);

  return (
    <>
      <EntryViewer date={date} entries={entries} />
      <EntryDelete
        date={date}
        entries={entries}
        retrieveJournalEntries={retrieveJournalEntries}
      />
    </>
  );
}

export default EntryCache;
