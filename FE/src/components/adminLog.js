import React, { useEffect, useState } from 'react';
import '../../src/css/adminLog.css';
import ChartComponent from './chartComponent';
import DonutChartComponent from './donutChartComponent';


const AdminLog = () => {
  const [data, setData] = useState([]);

  const [expandedRow, setExpandedRow] = useState(null); //표 확장 확인 state
  const [imageSrc, setImageSrc] = useState(''); //이미지 src state 


  useEffect(() => {
    const socket = new WebSocket('ws://bottle4.asuscomm.com:8080/websocket-endpoint');
  
    socket.onmessage = event => {
      const newLog = JSON.parse(event.data);
      
      let content;
      if (newLog.hasOwnProperty('content')) {
        content = newLog.content;
      } else {
        content = [newLog];
      }
  
      const formattedData = content.map((item) => {
        const createdDate = new Date(item.createdDate[0], item.createdDate[1] - 1, item.createdDate[2], item.createdDate[3], item.createdDate[4], item.createdDate[5]);
    
        const formattedDate = createdDate.toLocaleString(undefined, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        });
    
        return {
          ...item,
          x_min: parseFloat(item.x_min).toFixed(0),
          y_min: parseFloat(item.y_min).toFixed(0),
          x_max: parseFloat(item.x_max).toFixed(0),
          y_max: parseFloat(item.y_max).toFixed(0),
          name: item.name,
          confidence: (parseFloat(item.confidence) * 100).toFixed(0) + '%',
          createdDate: formattedDate,
          id: item.id,
        };
      });
  
      setData(prevData => [...formattedData, ...prevData]);
    };
  
    return () => {
      socket.close();
    };
  }, []);

  
    const handleRowClick = (index) => {         //행클릭시 확장되며 이미지 출력
      setImageSrc(null);
      if (expandedRow === index) {  // 이미 확장된 행을 클릭한 경우 닫음
        setExpandedRow(null);
      } else {
        setExpandedRow(index);
        const item = data[index];        //id를 대칭하여 이미지 찾음
        if (item && item.id) {
            loadImg(item.id);
            console.log(item.id)
        }
      }
    };


  const loadImg = (pictureValue) => {
    const url = `http://bottle4.asuscomm.com:8080/download/picture=${pictureValue}`;
  
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const objectUrl = URL.createObjectURL(blob);
        setImageSrc(objectUrl);
      });
  };

  
  return (
    <form className="adminform">  
      <div className="admintable">
        <h1 className="title">Log Display</h1>
          <table>
            <thead>
              <tr>
                  <th>작성일</th>
                  <th>종류</th>
                  <th>x_min</th>
                  <th>y_min</th>
                  <th>x_max</th>
                  <th>y_max</th>
                  <th>인식률</th>
              </tr>
            </thead>
            <tbody>

            {data.map((item, index) => ( 
                <React.Fragment key={index}>
                  <tr onClick={() => handleRowClick(index)}>
                    <td>{item?.createdDate}</td>
                    <td>{item?.name}</td>
                    <td>{item?.x_min}</td>
                    <td>{item?.y_min}</td>
                    <td>{item?.x_max}</td>
                    <td>{item?.y_max}</td>
                    <td>{item?.confidence}</td>
                  </tr>
                  {expandedRow === index && (
                    <tr className="expanded">
                      <td colSpan="8">
                        <div className="expanded-row">
                          <img src={imageSrc} alt={item?.id} style={{ maxWidth: '500px' }}/>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
                ))}
            </tbody>
          </table>
  </div>

  <div className="chartdiv">
    <div className="chart">
      <h1 className="title">Confidence Display</h1>
      <ChartComponent />
    </div>

    <div className="donut">
      <h1 className="title">Type Display</h1>
      <DonutChartComponent />
    </div>
  </div>
</form>
  );
}

  
                
    export default AdminLog;