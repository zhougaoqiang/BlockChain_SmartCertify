import TableTemplate from "../../components/TableTemplate";
import { useContext, useEffect, useState } from "react";
import FetchContext from "../../stores/fetchContext";

const PerViewCertificates = () => {
  const { fetchCertificates, certificates } = useContext(FetchContext);

  const title = "Certificates";
  const headers = ["No.", "School", "Cert. Type", "Honours", "Major"];

  useEffect(() => {
    fetchCertificates();
  }, []);

  return <TableTemplate headers={headers} data={certificates} title={title} />;
};

export default PerViewCertificates;
