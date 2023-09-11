import React from "react";

function Xaxis(props) {
  const { xScale, height, width } = props;

  return (
    <g>
      {<line x1={0} y1={height} x2={width} y2={height} stroke="black" />}
      {xScale.domain().map((tickValue) => (
        <g
          key={tickValue + "B"}
          transform={`translate(${xScale(tickValue)}, ${0})`}
        >
          <line y2={width} />
          {/* <text style={{ textAnchor: "end", fontSize: "10px" }}>
            {tickValue}
          </text> */}
        </g>
      ))}
    </g>
  );
}

export default Xaxis;
