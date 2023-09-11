import { useDistrict } from "../hooks";
import React, { useState, useEffect, useRef } from "react";
import {
  select,
  scaleBand,
  axisBottom,
  axisLeft,
  scaleLinear,
  stack,
  max,
  timeFormat,
} from "d3";

function ModalChart({ district, setDistrict }) {
  const chartRef = useRef();
  const wrapperRef = useRef();
  const covidDetails = useDistrict(district);
  const margin = { top: 10, right: 30, bottom: 20, left: 50 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  const colors = {
    case: "rgba(69, 0, 0, 0.8)",
    symptom: "rgba(240, 72, 19, 0.8)",
  };

  useEffect(() => {
    if (!chartRef.current) return;
    const svg = select(chartRef.current);

    const stackGenerator = stack().keys(["cases", "symptom"]);
    const layers = stackGenerator(covidDetails);

    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];
    const yScale = scaleLinear().domain(extent).range([height, 0]).nice();

    const x0Scale = scaleBand()
      .domain(
        covidDetails.map((d) => {
          return d.date;
        })
      )
      .rangeRound([0, width])
      .padding(0.6);

    const xAix = axisBottom(x0Scale);
    const yAix = axisLeft(yScale);

    svg
      .select(".x-axis")
      .attr("transform", `translate(50, ${height})`)
      .call(xAix)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.65em")
      .attr("dy", "-.45em")
      .attr("transform", "rotate(-90)");
    svg
      .select(".y-axis")
      .attr("transform", `translate(${45},  -40)`)
      .call(yAix);

    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      .attr("transform", `translate(45, -40)`)
      .attr("x", (sequence) => {
        return x0Scale(sequence.data.date);
      })
      .attr("width", x0Scale.bandwidth())
      .attr("y", (sequence) => yScale(sequence[1]))
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

    svg
      .append("circle")
      .attr("cx", 230)
      .attr("cy", 380)
      .attr("r", 6)
      .style("fill", "black");
    svg
      .append("circle")
      .attr("cx", 320)
      .attr("cy", 380)
      .attr("r", 6)
      .style("fill", "rgba(240, 72, 19, 0.8)");
    svg
      .append("text")
      .attr("x", 250)
      .attr("y", 380)
      .text("Cases")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
    svg
      .append("text")
      .attr("x", 350)
      .attr("y", 380)
      .text("asymptomatic Cases")
      .style("font-size", "15px")
      .attr("alignment-baseline", "middle");
  }, [district]);

  return (
    <>
      {district ? (
        <div id="open-modal" className="modal-window">
          <div>
            <svg ref={chartRef} style={{ width: width + 60, height:height +30 }}>
              <g
                className="x-axis"
                style={{ transform: "translate(45px, 329px)" }}
              />
              <g className="y-axis" style={{ height }} />
            </svg>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ModalChart;
