import React, { useEffect, useState } from 'react';
import '../../src/css/styles.css'; // CSS 파일을 임포트합니다.

function Temp() {
  const [logs, setLogs] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // 웹소켓 연결
    const socket = new WebSocket('ws://bottle4.asuscomm.com:8080/websocket-endpoint'); // 웹소켓 서버 주소로 수정

    // 웹소켓 메시지 수신 이벤트 핸들러
    socket.onmessage = event => {
      const newLog = event.data;


      // const prevLogs = () =>  [...prevLogs, newLog] ;
      setLogs(prevLogs => [newLog, ...prevLogs] );

      // setLogs(prevLogs)
      

    };

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    console.log('logs', logs)
    /*
    DA_LOG(ID=866, OriginalFileName=92496cf3-3c42-47dc-af02-cbfc17a9a8c5.jpg, FilePath=/home/bottle/files/da_picture/DA_92496cf3-3c42-47dc-af02-cbfc17a9a8c5.jpg, SavedFileName=DA_92496cf3-3c42-47dc-af02-cbfc17a9a8c5.jpg, x_min=406.56500244140625, x_max=470.6453552246094, y_max=283.7835693359375, y_min=49.438053131103516, name=glass, confidence=0.8278487920761108, createdDate=2023-06-02T10:17:19.569)
    */

    let logsSplit = logs.map((i) => i.replace('DA_LOG(', '').replace(')','').split(','))
    console.log('logsSplit' , logsSplit)

    let logsObject = [] ;
    for (let t of logsSplit) {
      let obj = {}
      for (let k of t) {
        k = k.split('=') ;
        obj[k[0]] = k[1] ; 
      } 
      console.log('obj', obj)
      logsObject.push(obj)
    }
    console.log('logsObject' , logsObject)

    /*const formattedData = logsObject.map((item) => ({
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
    }));
    console.log('format' , formattedData)*/
    setData(logsObject);
    //setTags(tmo) ;
  } , [logs]) ;

  return (
    <form className="dataform">
      <h1>Log Display</h1>
        <div className="datatable">
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>x_min</th>
            <th>x_max</th>
            <th>y_max</th>
            <th>y_min</th>
            <th>Name</th>
            <th>Confidence</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.ID}</td>
              <td>{item.x_min}</td>
              <td>{item.x_max}</td>
              <td>{item.y_max}</td>
              <td>{item.y_min}</td>
              <td>{item.name}</td>
              <td>{item.confidence}</td>
              <td>{item.createdDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </form>
  );
}

  
                
    export default Temp;