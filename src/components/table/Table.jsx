import React from "react";
import "./Table.css";
import TableHeader from "./table_header/TableHeader";
import TableBody from "./table_body/TableBody";

const Table = ({ boards }) => {
  return (
    <table>
      <TableHeader boards={boards} />
      <TableBody boards={boards} />
    </table>
  );
};

export default Table;
