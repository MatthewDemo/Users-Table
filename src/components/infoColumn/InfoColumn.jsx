import { useState } from "react";

const InfoColumn = ({ board, boards, setBoards }) => {
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  function dragOverHandler(e) {
    e.preventDefault();
  }
  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }
  function dropCardHandler(e, board) {
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
  }
  return (
    <div
    //   key={board.title}
      className="columns_container"
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropCardHandler(e, board)}
    >
      <h1 className="title_columns">{board.title}</h1>
      <ul className="list">
        {board.items.map((item) => (
          <li
            key={item.title}
            onDragOver={(e) => dragOverHandler(e)}
            onDragStart={(e) => dragStartHandler(e, board, item)}
            draggable={true}
            className="item"
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoColumn;
