import React, {
  MutableRefObject,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import { Graph } from "./components/Graph/Graph";
import { Sidebar } from "./components/Sidebar/Sidebar";
import "./App.css";
import { Moment } from "moment";

export type Dot = {
  time: Moment;
  value: number;
};
const values: Dot[] = [
  // {
  //   time: "57:45:302",
  //   value: 2,
  // },
  // {
  //   time: "57:47:798",
  //   value: 3,
  // },
  // {
  //   time: "57:48:893",
  //   value: 4,
  // },
  // {
  //   time: "57:51:165",
  //   value: 1,
  // },
  // {
  //   time: "57:53:29",
  //   value: -5,
  // },
  // {
  //   time: "57:55:837",
  //   value: 3,
  // },
  // {
  //   time: "57:57:33",
  //   value: 4,
  // },
  // {
  //   time: "58:00:556",
  //   value: -5,
  // },
];
function App() {
  const [dots, setDots] = useState(values);

  // const onDeleteDot = useCallback((dotIndex: number) => {
  //     setDots(dots.filter((dot: Dot, index: number) => index !== dotIndex));
  //   }, [setDots, dots]);

  const onDeleteDot = (dotIndex: number) => {
    setDots(dots.filter((dot: Dot, index: number) => index !== dotIndex));
  };

  const onDotCreate = (dot: Dot) => {
    setDots(dots.concat(dot));
  }

  return (
    <main className="main">
      <Graph dots={dots} />
      <Sidebar
        dots={dots} deleteDot={onDeleteDot}
        createDot={onDotCreate} />
    </main>
  );
}

export default App;
