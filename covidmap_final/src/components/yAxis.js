import React from 'react'

function Yaxis(props) {
  const { yScale, height,  } = props;
  return (
    <g>
      {<line y2={height} stroke="black" />}
      {yScale.ticks().map((tickValue) => (
        <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
          <line x2={10} stroke="black" />
          <text style={{ textAnchor: "end", fontSize: "10px" }}>
            {tickValue}
          </text>
        </g>
      ))}
    </g>
  );
}

export default Yaxis