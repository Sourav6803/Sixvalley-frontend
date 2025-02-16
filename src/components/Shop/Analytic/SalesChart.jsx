// import Chart from "react-apexcharts";

import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const SalesChart = () => {
  useEffect(() => {
    const options = {
      series: [
        {
          name: "Desktops",
          data: [10004, 13499, 8999, 11986, 4987, 6209],
        },
      ],
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 300,
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 250,
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
        formatter: () => "●", // Display a dot instead of value
        style: {
            // colors: ["#000"], // Set the color of the dot
            fontSize: "16px",
            backgroundColor: "transparent"
          },
        offsetY: -5, // Adjust position of the dot
      },
      
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on rows
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "20 Jan",
          "21 Jan",
          "22 Jan",
          "23 Jan",
          "24 Jan",
          "25 Jan",
        ],
      },
      yaxis: {
        title: {
            text: "Revenue (in thousands)", // Y-axis title
            style: {
              fontSize: "14px",
              color: "#666",
            },
          },
        labels: {
          formatter: (value) => `${value / 1000}k`, // Convert to '2k', '4k', etc.
          style: {
            fontSize: "12px",
          },
        },
      },

      title: {
        text: "Business Insights",
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // Cleanup to avoid memory leaks
    return () => {
      chart.destroy();
    };
  }, []);

  return <div id="chart"></div>;
};

export default SalesChart;
