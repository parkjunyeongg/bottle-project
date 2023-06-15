import React, { useEffect, useState } from 'react';
import ChartComponent from './chartComponent';
import DonutChartComponent from './donutChartComponent';


const AdminLog = () => {
  const [data, setData] = useState([]);
  
  //const [pageInfo, setPageInfo] = useState(0);

    const [expandedRow, setExpandedRow] = useState(null); //표 확장 확인 state
    const [imageSrc, setImageSrc] = useState(''); //이미지 src state 

    //const [pageNumber, setPageNumber] = useState(0);
    
  

  useEffect(() => {
    // 웹소켓 연결
    const socket = new WebSocket('ws://bottle4.asuscomm.com:8080/websocket-endpoint'); // 웹소켓 서버 주소로 수정

    // 웹소켓 메시지 수신 이벤트 핸들러
    socket.onmessage = event => {
      const newLog = JSON.parse(event.data);
      
      const { content, totalPages } = newLog;

      const formattedData = content.map((item) => {
        const createdDate = new Date(...item.createdDate);
      
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
      
      setData(formattedData);
      //setPageInfo({ totalPages });
    };
    
    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      socket.close();
    };
  }, [data]);


  /*const handlePageChange = (newPageNumber) => {
    setExpandedRow(null);
    setPageNumber(newPageNumber);
  };
  


  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.floor(pageNumber / 10) * 10 + 1;
    const endPage = Math.min(startPage + 9, pageInfo.totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePreviousPage = (event) => {
    event.preventDefault();
    setExpandedRow(null);

    const previousPage = Math.floor((pageNumber) / 10) * 10;
    if (previousPage > 0) {
        setPageNumber(previousPage-1);
      } else {
        setPageNumber(0);
    };
  }

  const handleNextPage = (event) => {
    event.preventDefault();
    setExpandedRow(null);
  
    // 현재 페이지 범위 계산
    const currentPageRange = Math.floor((pageNumber ) / 10); // 현재 페이지 범위 (0부터 시작)
    const maxPageRange = Math.floor((pageInfo.totalPages - 1) / 10); // 최대 페이지 범위
  
    if (currentPageRange < maxPageRange) {
      // 다음 페이지 범위가 존재하는 경우
      const nextPage = (currentPageRange + 1) * 10; // 다음 페이지 범위의 첫 페이지
      setPageNumber(nextPage);
    } else {
      // 다음 페이지 범위가 없는 경우, 마지막 페이지로 이동
      setPageNumber(pageInfo.totalPages - 1);
    }
  };*/


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

  /*const currentPageRangeStart = Math.floor(pageNumber / 10) * 10 + 1;
  const currentPageRangeEnd = currentPageRangeStart + 9;
  const isLastPageRange = currentPageRangeEnd >= pageInfo.totalPages;*/
  
  
  
  return (
    <form className="dataform">
      <h1>Log Display</h1>
    <div className="datatable">
    <table>
      <thead>
        <tr>
            <th>작성일</th>
            <th>작성자</th>
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
              <td>익명</td>
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

{/* 페이징 UI */}
{/*{pageInfo && (
    <div className="pagebar">
      {pageNumber > 9 && (
        <button className="nextbutton" onClick={handlePreviousPage}>이전</button>
      )}

      {getPageNumbers().map((page) => {
      const buttonClasses = pageNumber === page - 1 ? "active-button" : "inactive-button";

      return (
        <button
          key={page}
          onClick={() => handlePageChange(page - 1)}
          disabled={pageNumber === page - 1}
          className={buttonClasses}
        >
          {page}
        </button>
      );
    })}

      {!isLastPageRange &&  (
        <button className="nextbutton" onClick={handleNextPage}>다음</button>
      )}
    </div>
  )}*/}

  <ChartComponent />
  <DonutChartComponent />
</form>
  );
}

  
                
    export default AdminLog;