import React, { useState, useEffect } from "react";
import { max, scaleLinear, scaleBand } from "d3";

import { useJsonData } from "../hooks";
import Bar from "./Bar";
import Xaxis from "./xAxis";
import Yaxis from "./yAxis";

function Chart({ selectedDate, changeDate }) {
  const margin = { left: 50, right: 50, top: 50, bottom: 150, gap: 70 };
  const width = 1000 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  const covidData = useJsonData();
  const [data, setData] = useState([]);
  const xScale = scaleBand()
    .domain(data.map((d) => d.date))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([
      0,
      max(data, function (d) {
        return d.count;
      }),
    ])
    .range([height, 0])
    .nice();

  useEffect(() => {
    const finalLists = [];
    covidData.map((item) => {
      const obj = {};
      obj["date"] = item.date;
      let totalCount = 0;
      Object.keys(item.value).map((district) => {
        const districtObj = item.value[district];
        totalCount += districtObj.cases
          ? districtObj.cases + districtObj.asymptomaticCases
          : 0;
      });
      obj["count"] = totalCount;
      finalLists.push(obj);
    });

    setData(finalLists);
  }, [selectedDate]);

  return (
    <div style={{marginInline:'121px'}}>
      <svg width={width + 500} height={height + 200}>
        <g transform={"translate(" + margin.left + "," + margin.top + ")"}>
          <Bar
            selectedDate={selectedDate}
            changeDate={changeDate}
            yScale={yScale}
            xScale={xScale}
            height={height}
            data={data}
          />
          <Xaxis xScale={xScale} height={height} width={width} />
          <Yaxis yScale={yScale} height={height} />
        </g>
      </svg>
    </div>
  );
}

export default Chart;
