import React, { useEffect, useState } from 'react';
import '../../src/css/styles.css'; // CSS 파일을 임포트합니다.

function AdminLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // 웹소켓 연결
    const socket = new WebSocket('ws://bottle4.asuscomm.com:8080/websocket-endpoint'); // 웹소켓 서버 주소로 수정

    // 웹소켓 메시지 수신 이벤트 핸들러
    socket.onmessage = event => {
      const newLog = event.data;
      
      setLogs(prevLogs => [...prevLogs, newLog]);
      console.log(logs);
    };

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      socket.close();
    };
  }, []);

  /*const formattedData = logs.map((item) => ({
    ...item,
    x_min: parseFloat(item.x_min).toFixed(3),
    x_max: parseFloat(item.x_max).toFixed(3),
    y_min: parseFloat(item.y_min).toFixed(3),
    y_max: parseFloat(item.y_max).toFixed(3),
    name: item.name,
    confidence: (parseFloat(item.confidence) * 100).toFixed(0) + '%',
    createdDate: new Date(item.createdDate).toLocaleString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }),
    id: item.id,
  }));*/
  
  return (
    <div>
      <h1>Log Display</h1>
      {logs.map((log, index) => {
      const jsonObject = JSON.parse(log);

      return (
      <tr key={index}>
        <td>{jsonObject.x_min}</td>
        <td>{jsonObject.x_max}</td>
        <td>{jsonObject.y_min}</td>
        <td>{jsonObject.y_max}</td>
        <td>{jsonObject.name}</td>
        <td>{jsonObject.confidence}</td>
        {/* 이 외에 필요한 필드들을 추가로 출력하면 됩니다 */}
      </tr>
    );
  })}

    </div>
  );
}

  
                
    export default AdminLog;