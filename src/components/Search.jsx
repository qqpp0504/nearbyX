import { useState } from "react";

import classes from "./Search.module.css";
import downIcon from "../assets/down-icon.png";
import EventEmitter from "../utils/EventEmitter.js";

const PLACETYPES = [
  {
    name: "餐廳",
    value: "restaurant",
  },
  {
    name: "超商",
    value: "market",
  },
  {
    name: "加油站",
    value: "gas_station",
  },
  {
    name: "咖啡廳",
    value: "cafe",
  },
];

export default function Search() {
  const [radius, setRadius] = useState("");
  const [current, setCurrent] = useState(PLACETYPES[0]);
  const [visible, setVisible] = useState(false);

  function handleShowMore() {
    setVisible((prev) => !prev);
  }

  function handleOptionClick(placeOption) {
    setCurrent(placeOption);
    setVisible(false);
  }

  function handleChange(event) {
    const value = event.target.value;

    if (+value || value === "") {
      setRadius(value);
    }
  }

  function handleClick() {
    EventEmitter.emit("search", {
      type: current.value,
      radius: parseInt(radius),
    });
    // onSearch({ type: current.value, radius: parseInt(radius) });
  }

  return (
    <div className="fixed top-[54px] left-1/2 -translate-x-1/2 w-[345px] h-[54px] bg-white z-10 flex justify-between items-center p-4 rounded-xl">
      <div className="flex justify-between items-center gap-1">
        <button onClick={handleShowMore} className="flex items-center gap-1">
          <span style={{ color: visible && "#9a53f4" }}>{current.name}</span>
          <img
            src={downIcon}
            alt="Down icon"
            className={`transition-all duration-200 ${
              visible ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div className="ml-1" style={{ color: "#c4c7ce" }}>
          |
        </div>

        <input
          type="text"
          onChange={handleChange}
          value={radius}
          placeholder="請輸入搜尋距離（公尺）"
          className="w-40 ml-1 focus:outline-none"
        />
      </div>

      <button
        onClick={handleClick}
        className={`rounded-3xl w-16 py-1 text-center text-white ${classes["search-btn"]}`}
      >
        搜尋
      </button>

      {visible && (
        <div className="absolute translate-y-32 left-0 w-full h-44 bg-white rounded-xl p-4 flex flex-col justify-between">
          {PLACETYPES.map((item) => (
            <div
              key={item.name}
              style={{
                color: item.value === current.value ? "#9a53f4" : "#707479",
              }}
            >
              <button onClick={() => handleOptionClick(item)}>
                {item.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
