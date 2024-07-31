import TableTemplate from "../../components/TableTemplate";
import { useContext, useEffect, useState } from "react";
import FetchContext from "../../stores/fetchContext";

const ComFinalCandidate = () => {
  const { fetchCandidates, candidates } = useContext(FetchContext);

  const title = "Final Candidate";
  const headers = ["No.", "ID", "Nationality", "NRIC", "Passport", "Name", "Address", "Status"];

  useEffect(() => {
    fetchCandidates();
  }, []);

  const actions = ["create", "delete", "verify"];

  return (
    <TableTemplate
      headers={headers}
      data={candidates}
      title={title}
      actions={actions}
    />
  );
};

export default ComFinalCandidate;
