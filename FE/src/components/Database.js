import '../../src/css/database.css';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

const Database = () => {
    //로그 시간,위치 제일중요
    //이미지 판별된 순간 바로 실시간 로그 갱신

    const [data, setData] = useState([]); //boot에서 불러온 data를 넣음
    const [expandedRow, setExpandedRow] = useState(null); //표 확장 확인 state
    const [imageSrc, setImageSrc] = useState(''); //이미지 src state 

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(15);
    const [pageInfo, setPageInfo] = useState(0);

    
    //let pageUrl = `http://bottle4.asuscomm.com:8080/getdalogpage?page=${pageNumber}&size=${pageSize}`
    //fetch("http://10.125.121.221:8080/getdalog")
    //fetch('http://bottle4.asuscomm.com:8080/getdalog') 

    



        const handlePageChange = (newPageNumber) => {
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
        };


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
    
          const currentPageRangeStart = Math.floor(pageNumber / 10) * 10 + 1;
          const currentPageRangeEnd = currentPageRangeStart + 9;
          const isLastPageRange = currentPageRangeEnd >= pageInfo.totalPages;
          

          const [selectedSortOption, setSelectedSortOption] = useState('');           //select 관리 
          const [selectedSizeOption, setSelectedSizeOption] = useState('');
          const [showSortSelect, setShowSortSelect] = useState('');
          const [showDateSelect, setShowDateSelect] = useState(false);
          const [showConfidence, setShowConfidence] = useState(false);
          const [sortSelect, setSortSelect] = useState('');


          const [startDate, setStartDate] = useState(null); //date관리
          const [endDate, setEndDate] = useState(null);
          
          let url = `http://bottle4.asuscomm.com:8080/getdalogsearch?paga=${pageNumber}&size=${pageSize}${showSortSelect ? `&name=${showSortSelect}` : ''}${startDate ? `&startDate=${startDate.toLocaleDateString('en-CA')}T00:00:00` : ''}${endDate ? `&endDate=${endDate.toLocaleDateString('en-CA')}T23:59:59` : ''}`;
          
          const handlePageSizeChange = (e) => {
            const selectedValue = e.target.value;
            setPageSize(selectedValue);
            setSelectedSizeOption(selectedValue);
            console.log(pageSize)
          }
          
          const handleSortOption = (event) => {
            const value = event.target.innerText;
            // value를 이용한 로직 작성
            console.log(value); // 예시: 콘솔에 값 출력
            setShowSortSelect(value)
            
          }
          /*let url =`http://bottle4.asuscomm.com:8080/getdalogsearch?paga=${pageNumber}&size=${pageSize}`
          url=url+`&name=${pageSize}`*/
         
          
          useEffect(() => {                      //db불러오기
            console.log(url);
            fetch(url)         
                  .then(response => response.json())
                  .then(json => {
                    const { content, totalPages } = json; // 페이지에 띄울 데이터 배열과 총 페이지 수
      
                    const formattedData = content.map((item) => ({
                      ...item,
                      x_min: parseFloat(item.x_min).toFixed(0),
                      x_max: parseFloat(item.x_max).toFixed(0),
                      y_min: parseFloat(item.y_min).toFixed(0),
                      y_max: parseFloat(item.y_max).toFixed(0),
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
      
                    setData(formattedData);
                    setPageInfo({ totalPages });
                  })
                
              }, [pageNumber, pageSize, sortSelect, startDate, endDate]);

              

              const handleDateSearch = (event) => {
                event.preventDefault();
                setSortSelect("date");
                setPageNumber(0);
              }

    return(
      <form className="dataform">
        <div className="datatable">
          <h1 className="title">전체 이미지 인식 내역</h1>
  

      <div className="buttonSort">
        <div className="sort1">
          <div className="sorth3">
            <h3>종류</h3>
          </div>
          <div className="sortul">
            <ul>
              <li onClick={handleSortOption}>green_bottle</li>
              <li onClick={handleSortOption}>brown_bottle</li>
              <li onClick={handleSortOption}>clear_bottle</li>
              <li>
                <select className="selects" value={selectedSizeOption} onChange={handlePageSizeChange}> 
                  <option value="15">15개씩</option>
                  <option value="30">30개씩</option>
                  <option value="50">50개씩</option>
                  <option value="100">100개씩</option>
               </select>
              </li>
            </ul>
          </div>
        </div>
        <div className="sort1">
          <div className="sorth3">
            <h3>날짜</h3>
          </div>
          <div className="dateul">
          <ul>
              <li><DatePicker
              className="bottleDate"
              selected={startDate}
              shouldCloseOnSelect
              minDate={new Date('2023-01-01')}
              maxDate={new Date()}
              startDate={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
            /></li>
              <li><DatePicker
              className="bottleDate"
              selected={endDate}
              shouldCloseOnSelect
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={new Date()}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
            /></li>
            </ul>
            
          </div>
          
        </div>
        <div className="sort1">
          <div className="sorth3">
            <h3>인식률</h3>
          </div>
          <div className="sortul">
            <ul>
              <li>50%이상</li>
              <li>70%이상</li>
              <li>직접입력</li>
            </ul>
          </div>
        </div>

      </div>
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
    
    {/* 페이징 UI */}
    {pageInfo && (
        <div className="pagebar">
          {/* 이전 페이지 */}
          {pageNumber > 9 && (
            <button className="nextbutton" onClick={handlePreviousPage}> {'<'} 이전 </button>
          )}

          {/* 페이지 번호 */}
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

          {/* 다음 페이지 */}
          {!isLastPageRange &&  (
            <button className="nextbutton" onClick={handleNextPage}>다음 {'>'}</button>
          )}
        </div>
      )}
    </form> 
  );
}
                
    export default Database;