import { useState } from "react";
import "./App.css";
import { Graph } from "./components/Graph/Graph";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Moment } from "moment";

export type Dot = {
  time: Moment;
  value: number;
};

function App() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [rightSidebarOpen, setRightSidebarOpen] = useState<boolean>(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false);

  const onDeleteDot = (dotIndex: number) => {
    setDots(dots.filter((dot: Dot, index: number) => index !== dotIndex));
  };

  const onDotCreate = (dot: Dot) => {
    setDots(dots.concat(dot));
  };

  const rightArrowClick = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const leftArrowClick = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };
  return (
    <>
      <main
        className="main"
      >
        <div className={`content ${leftSidebarOpen ? "content_with-left-sidebar" : ""} ${
          rightSidebarOpen ? "content_with-right-sidebar" : ""
        }`}>
          <Graph dots={dots} sidebars={ Number(leftSidebarOpen) + Number(rightSidebarOpen)} />
          <Sidebar dots={dots} deleteDot={onDeleteDot} createDot={onDotCreate} />
        </div>

        <button
          className={`button button_left ${
            leftSidebarOpen ? "button_reverse" : ""
          }`}
          onClick={leftArrowClick}
        >
          ◀
        </button>
        <button
          className={`button button_right ${
            rightSidebarOpen ? "button_reverse" : ""
          }`}
          onClick={rightArrowClick}
        >
          ◀
        </button>
       
      </main>
    </>
  );
}

export default App;
