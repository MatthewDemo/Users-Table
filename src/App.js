import "./App.css";
import { useEffect, useState } from "react";
import Modal from "./components/modal/Modal";
import { fetchUsers } from "./redux/slices/usersSlice";
import { setModalActive } from "./redux/slices/categorySlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Available columns",
      items: [
        { id: 1, title: "email" },
        { id: 2, title: "id" },
        { id: 3, title: "address" },
        { id: 4, title: "website" },
      ],
    },
    {
      id: 2,
      title: "Selected columns",
      items: [
        { id: 5, title: "name" },
        { id: 6, title: "username" },
        { id: 7, title: "phone" },
        { id: 8, title: "company" },
      ],
    },
  ]);

  // console.log(users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <div className="table_container">
        <button
          className="selectBtn"
          onClick={() => dispatch(setModalActive(true))}
        >
          Select columns
        </button>
        <table>
          <thead>
            <tr>
              {boards[1].items.map((item) => (
                <td key={item.title}>{item.title.toUpperCase()}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((item) => (
                <tr>
                  {boards[1].items.map((column) => {
                    const data = item[column.title];

                    if (typeof data === "string" || typeof data === "number") {
                      return <td key={column.title}>{data}</td>;
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
        </table>
      </div>
      <Modal boards={boards} setBoards={setBoards} />
    </div>
  );
}

export default App;
