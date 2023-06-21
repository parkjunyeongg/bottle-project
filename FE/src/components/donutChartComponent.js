import { useEffect , useRef } from 'react';
import ApexCharts from 'apexcharts';

const DonutChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('http://bottle4.asuscomm.com:8080/getdalog')
      .then(response => response.json())
      .then(json => {
        const nameCounts = countNames(json);
        const names = Object.keys(nameCounts);
        updateDonutChart(names, nameCounts);
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

  const updateDonutChart = (names, nameCounts) => {
    const series = names.map(name => nameCounts[name]);

    const options = {
      chart: {
        type: 'donut',
      },
      series: series,
      labels: names,
      colors: ['#3B240B', '#D8D8D8', '#21610B'],
    };

    if (chartRef.current) {
      chartRef.current.updateSeries(series);
      chartRef.current.updateOptions(options);
    } else {
      chartRef.current = new ApexCharts(document.getElementById('donut-chart'), options);
      chartRef.current.render();
    }
  };

  return <div id="donut-chart" />
};

export default DonutChartComponent;