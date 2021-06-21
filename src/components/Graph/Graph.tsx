import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { useEffect, useLayoutEffect, useState } from "react";
import { Dot } from "../../App";
import "./Graph.css";

export function Graph({ dots, sidebars }: { dots: Dot[]; sidebars: number }) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [d, setD] = useState("");

  useLayoutEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const times: number[] = dots.map((item: any) => item.time.valueOf());
  const values: number[] = dots.map((item: any) => item.value);

  const maxTime: number = Math.max(...times);
  const minTime = Math.min(...times);
  const maxValue: number = Math.max(...values);
  const minValue: number = Math.min(...values);

  useEffect(() => {
    const xScale = scaleLinear()
      .domain([minTime, maxTime])
      .range([0, size.width - 315 - sidebars * 200]);

    const yScale = scaleLinear()
      .domain([maxValue, minValue])
      .range([0, size.height - 40]);

    const myLine = line()
      .x((d: any) => {
        return xScale(d[0]);
      })
      .y((d: any) => yScale(d[1]));

    setD(
      myLine(
        dots.map((item) => {
          return [item.time.valueOf(), item.value];
        })
      ) as string
    );
  }, [size, dots, maxTime, maxValue, minTime, minValue, sidebars]);

  return (
    <div className="graph-container">
      <svg width={"100%"} height={size.height - 30}>
        <path
          className="line"
          fill="none"
          stroke="steelblue"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          preserveAspectRatio="xMinYMin meet"
          viewBox="0 0 300 300"
          d={d}
        />
      </svg>
    </div>
  );
}
