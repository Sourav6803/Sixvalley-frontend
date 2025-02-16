import React, { useEffect } from "react";
import {  AgCharts } from "ag-charts-react";

const AreaChart = () => {
  const data = [
    {
      date: new Date(2015, 0, 1),
      "Tate Britain": 103268,
      "Tate Modern": 307185,
      "Tate Liverpool": 43888,
      "Tate St Ives": 3939,
    },
    // Add the rest of your data here...
  ];

  const options = {
    title: {
      text: "Total Visitors to Tate Galleries",
    },
    footnote: {
      text: "Source: Department for Digital, Culture, Media & Sport",
    },
    data,
    series: [
      {
        type: "area",
        xKey: "date",
        yKey: "Tate Modern",
        yName: "Tate Modern",
      },
      {
        type: "area",
        xKey: "date",
        yKey: "Tate Britain",
        yName: "Tate Britain",
      },
      {
        type: "area",
        xKey: "date",
        yKey: "Tate Liverpool",
        yName: "Tate Liverpool",
      },
      {
        type: "area",
        xKey: "date",
        yKey: "Tate St Ives",
        yName: "Tate St Ives",
      },
    ],
    axes: [
      {
        type: "time",
        position: "bottom",
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "Total visitors",
        },
        label: {
          formatter: (params) => params.value / 1000 + "k",
        },
      },
    ],
  };

  return <AgCharts options={options} />;
};

export default AreaChart;
