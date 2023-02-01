import "./App.css";
import { useEffect, useState } from "react";
import Modal from "./components/modal/Modal";
import { fetchUsers } from "./redux/slices/usersSlice";
import { setModalActive } from "./redux/slices/categorySlice";
import { useDispatch } from "react-redux";
import Table from "./components/table/Table";
import VideoBG from "./components/video/Video";

function App() {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="App">
      <VideoBG />
      <div className="table_container">
        <button
          className="selectBtn"
          onClick={() => dispatch(setModalActive(true))}
        >
          Select columns
        </button>
        <Table boards={boards} />
      </div>
      <Modal boards={boards} setBoards={setBoards} />
    </div>
  );
}

export default App;
