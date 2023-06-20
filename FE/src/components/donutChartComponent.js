import { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const DonutChartComponent = () => {
  useEffect(() => {
    fetch('http://bottle4.asuscomm.com:8080/getdalog')
      .then(response => response.json())
      .then(json => {
        const nameCounts = countNames(json);
        const names = Object.keys(nameCounts);
        createDonutChart(names, nameCounts);
      });
  }, []);

  const countNames = (data) => {
    const nameCounts = {};
    data.forEach(item => {
      const { name } = item;
      if (nameCounts[name]) {
        nameCounts[name]++;
      } else {
        nameCounts[name] = 1;
      }
    });
    return nameCounts;
  };

  const createDonutChart = (names, nameCounts) => {
    const series = names.map(name => nameCounts[name]);

    const options = {
      chart: {
        type: 'donut',
      },
      series: series,
      labels: names,
      colors: ['#3B240B', '#D8D8D8', '#21610B'],
    };

    const chart = new ApexCharts(document.getElementById('donut-chart'), options);
    chart.render();
  };

  return <div id="donut-chart" />
};

export default DonutChartComponent;