import React, { useEffect, useState } from 'react';
import '../../src/css/styles.css'; // CSS 파일을 임포트합니다.

function Temp() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // 웹소켓 연결
    const socket = new WebSocket('ws://10.125.121.221:8080/websocket-endpoint'); // 웹소켓 서버 주소로 수정

    // 웹소켓 메시지 수신 이벤트 핸들러
    socket.onmessage = event => {
      const newLog = event.data;
      setLogs(prevLogs => [...prevLogs, newLog]);
    };

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Log Display</h1>
      {logs.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
}

  
                
    export default Temp;