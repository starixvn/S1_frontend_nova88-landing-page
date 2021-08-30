import React, { useContext } from "react";
import { popBoxContext } from "../components/context";

const PopBox = () => {
  const { popBox, setPopBox } = useContext(popBoxContext);
  return (
    <div id="popup" className={`${popBox.isOpen ? "active" : ""}`}>
      <div
        className={`${popBox.className ?? ""}${popBox.isOpen ? " active" : ""}`}
      >
        <div className="popTitle">
          {popBox.title}
          <button
            className="close"
            onClick={() => setPopBox({ isOpen: false })}
          >
            X
          </button>
        </div>
        {popBox.content}
      </div>
    </div>
  );
};

export default PopBox;
