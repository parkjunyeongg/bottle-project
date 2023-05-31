import React, { useState, useEffect } from 'react';

const Database = () => {
    //로그 시간,위치 제일중요
    //이미지 판별된 순간 바로 실시간 로그 갱신

    const [data, setData] = useState([]); //boot에서 불러온 data를 넣음
    const [expandedRow, setExpandedRow] = useState(null); //표 확장 확인 state
    const [imageSrc, setImageSrc] = useState(''); //이미지 src state 

    useEffect(() => {                   
      fetch('http://bottle4.asuscomm.com:8080/getdalog')                            //db불러오기
        //fetch("http://10.125.121.221:8080/getdalog")
        //fetch('http://bottle4.iptime.org:8080/getdalog')
            .then(response => response.json())
            .then(json => {
              const formattedData = json.map((item) => ({
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
              const reversedData = formattedData.reverse(); //역순 정렬 (최근기록부터)
              setData(reversedData);
            });
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
      
    return(
      
      <form className="dataform">
        <div className="datatable">
        <table>
          <thead>
            <tr>
                <th>작성일</th>
                <th>작성자</th>
                <th>종류</th>
                <th>x_min</th>
                <th>x_max</th>
                <th>y_min</th>
                <th>y_max</th>
                <th>인식률</th>
            </tr>
          </thead>
          <tbody>
          {data.map((item, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => handleRowClick(index)}>
                  <td>{item?.createdDate}</td>
                  <td>익명</td>
                  <td>{item?.name}</td>
                  <td>{item?.x_min}</td>
                  <td>{item?.x_max}</td>
                  <td>{item?.y_min}</td>
                  <td>{item?.y_max}</td>
                  <td>{item?.confidence}</td>
                </tr>
                {expandedRow === index && (
                  <tr>
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
      </form>
        );
    }
                
    export default Database;