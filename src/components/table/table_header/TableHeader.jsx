import React from "react";
import './TableHeader.css'

const TableHeader = ({ boards }) => {
  return (
    <thead>
      <tr>
        {boards[1].items.map((item) => (
          <td key={item.title}>{item.title.toUpperCase()}</td>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
