import React from "react";
import { useSelector } from "react-redux";

const TableBody = ({ boards }) => {
  const users = useSelector((state) => state.users.users);
  return (
    <tbody>
      {users &&
        users.map((item) => (
          <tr key={item.title}>
            {boards[1].items.map((column) => {
              const data = item[column.title];
              if (typeof data === "string" || typeof data === "number") {
                return <td key={column.title}> {data} </td>;
              } else {
                if (data.name) {
                  return <td key={column.title}> {data.name} </td>;
                } else {
                  return <td key={column.title}> {data.city} </td>;
                }
              }
            })}
          </tr>
        ))}
    </tbody>
  );
};

export default TableBody;
