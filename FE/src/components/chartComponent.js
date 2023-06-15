import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';

const ChartComponent = () => {
  //const [confidenceData, setConfidenceData] = useState([]);

  useEffect(() => {
    fetch("http://bottle4.asuscomm.com:8080/getdalog")
      .then(response => response.json())
      .then(json => {
        const formattedData = json.map(item => parseFloat(item.confidence) * 100);
        createChart(formattedData);
      });
  }, []);

  const createChart = (data) => {
    const roundedData = data.map(item => Math.floor(item));

    const options = {
      chart: {
        type: 'line',
      },
      series: [
        {
          name: 'Confidence',
          data: roundedData,
        },
      ],
      xaxis: {
        categories: roundedData.map((_, index) => index + 1),
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val + "%";
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
      },
  };

    const chart = new ApexCharts(document.getElementById('chart'), options);
    chart.render();
  };

  return (
  
      <div id="chart" />
    
  );
};

export default ChartComponent;