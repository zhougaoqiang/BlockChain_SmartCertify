import TableTemplate from "../../components/TableTemplate";
import { useContext, useEffect, useState } from "react";
import FetchContext from "../../stores/fetchContext";

const SchStudents = () => {
  const { fetchStudents, students } = useContext(FetchContext);

  const title = "Matriculated Students";
  const headers = ["No.", "ID No.", "Name"];

  useEffect(() => {
    fetchStudents();
  }, []);

  const actions = ["create", "graduate"];

  return (
    <TableTemplate
      headers={headers}
      data={students}
      title={title}
      actions={actions}
    />
  );
};

export default SchStudents;
