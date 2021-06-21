import moment from "moment";
import {
  ChangeEvent,
  KeyboardEvent,
  useState,
} from "react";
import { Dot } from "../../App";
import "./Sidebar.css";

export function Sidebar({
  dots,
  deleteDot,
  createDot,
}: {
  dots: Dot[];
  deleteDot: (index: number) => void;
  createDot: (dot: Dot) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: ChangeEvent) => {
    const nextValue = (event.target as any).value;
    setInputValue(nextValue);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      createDot({
        time: moment(),
        value: Number(inputValue),
      });
      setInputValue("");
    }
  };

  return (
    <div className="sidebar">
      <p className="sidebar__title">Data</p>
      <input
        className="sidebar__input"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={inputValue}
      />

      <p className="sidebar__values-title">List of values</p>

      <div className="sidebar__values-list">
        {dots.map((item, index) => (
          <div key={item.time.toString()} className="sidebar-item">
            <span className="sidebar-item__time">
              {item.time.format("mm:ss:SSS")}
            </span>
            <span className="sidebar-item__value">{item.value}</span>
            <button
              className="sidebar-item__remove"
              onClick={() => deleteDot(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
