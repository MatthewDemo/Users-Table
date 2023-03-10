import { useState } from "react";
import { setModalActive } from "../../redux/slices/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import "./Modal.css";

const Modal = ({ boards, setBoards }) => {
  const dispatch = useDispatch();
  const modalActive = useSelector((state) => state.category.modalActive);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragOverHandler(e) {
    e.preventDefault();
  }
  function dragStartHandler(board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }
  function dropCardHandler(board) {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
    setFilteredCells(boards[0].items);
  }

  function removeItem(e) {
    const save = boards[1].items.find(
      (elem) =>
        elem.title.toUpperCase() == e.target.parentNode.innerText.toUpperCase()
    );
    const selectedColumns = boards[1].items.filter(
      (elem) =>
        elem.title.toUpperCase() !== e.target.parentNode.innerText.toUpperCase()
    );
    const availableColumns = [...boards[0].items, save];
    setBoards([
      {
        id: 1,
        title: "Available columns",
        items: availableColumns,
      },
      {
        id: 2,
        title: "Selected columns",
        items: selectedColumns,
      },
    ]);
    setFilteredCells(availableColumns);
  }

  const [filteredCells, setFilteredCells] = useState(boards[0].items);

  const searchItem = (value) => {
    if (value === "") {
      setFilteredCells(boards[0].items);
      return;
    }
    setFilteredCells(
      filteredCells.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div
      className={modalActive ? "modal active" : "modal"}
      onClick={() => dispatch(setModalActive(false))}
    >
      <div
        className={modalActive ? "modal_content active" : "modal_content"}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          className="search_input"
          type="text"
          placeholder="Search available columns..."
          onChange={(e) => searchItem(e.target.value)}
        />

        <div className="category_container">
          {boards.map((board) => (
            <div
              key={board.title}
              className="columns_container"
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={() => dropCardHandler(board)}
            >
              <h1 className="title_columns">{board.title}</h1>
              <ul className="list">
                {board.title === "Available columns" &&
                  filteredCells.map((item) => {
                    return (
                      <li
                        key={item.title}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragStart={() => dragStartHandler(board, item)}
                        draggable={true}
                        className="li_draggable"
                      >
                        {item.title.toUpperCase()}
                      </li>
                    );
                  })}
                {board.title === "Selected columns" &&
                  board.items.map((item) => {
                    return (
                      <li
                        key={item.title}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragStart={() => dragStartHandler(board, item)}
                        draggable={true}
                      >
                        {item.title.toUpperCase()}
                        <img
                          className="cross_img"
                          onClick={removeItem}
                          src="https://cdn1.iconfinder.com/data/icons/interface-travel-and-environment/64/cross-delete-interface-remove-256.png"
                          alt="cross"
                        />
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
        <button
          onClick={() => dispatch(setModalActive(false))}
          className="apply_btn"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Modal;
