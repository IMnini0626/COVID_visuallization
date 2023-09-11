import * as d3 from "d3";
import React, { useEffect, useState } from "react";
function Bar(props) {
  const rectRef = React.createRef();
  const { xScale, yScale, height, data, selectedDate, changeDate } = props;

  const getColor = (obj) => {
    if (!selectedDate) return 'green'
    return selectedDate == obj.date ? "red" : "green";
  };

  useEffect(() => {
    d3.select(rectRef.current).selectAll("rect").remove();
    d3.select(rectRef.current)
      .selectAll("g")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return xScale(d.date);
      })
      .attr("y", function (d) {
        return yScale(d.count);
      })
      .attr("fill", function (d) {
        return getColor(d)
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return height - yScale(d.count);
      })
      .on("click", function (d, data) {
        const regex = /(\d+)月(\d+)日/;
        const day = data.date.split(regex);
        const date = new Date(
          `${new Date().getFullYear()}-${day[1]}-${day[2]}`
        );
        changeDate(date);
      });
  }, [data,selectedDate]);

  return (
    <>
      <g ref={rectRef}></g>
    </>
  );
}

export default Bar;
