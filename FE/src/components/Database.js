import '../../src/css/database.css';
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";

const Database = () => {
    //로그 시간,위치 제일중요
    //이미지 판별된 순간 바로 실시간 로그 갱신

    const [data, setData] = useState([]); //boot에서 불러온 data를 넣음
    const [expandedRow, setExpandedRow] = useState(null); //표 확장 확인 state
    const [imageSrc, setImageSrc] = useState(''); //이미지 src state 

    const [pageNumber, setPageNumber] = useState(0);
    //const [pageSize, setPageSize] = useState(15);
    const [pageInfo, setPageInfo] = useState(0);

    let pageSize = 15;
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
          

          const [selectedOption, setSelectedOption] = useState('');                          //select 관리 
          const [showSortSelect, setShowSortSelect] = useState(false);
          const [showDateSelect, setShowDateSelect] = useState(false);
          const [sortSelect, setSortSelect] = useState('');

          const handleOptionChange = (event) => {           //기본 select
            const selectedValue = event.target.value;
            setSelectedOption(selectedValue);
            setShowSortSelect(selectedValue === 'specificOption');
            setShowDateSelect(selectedValue === 'bottleDate')
            
          };
          
          const handle2OptionChange = (event) => {      //종유별 정렬 select
            const selectedValue = event.target.value;
            setSortSelect(selectedValue);
          };

          useEffect(() => {                      //db불러오기
            const getPageUrl = () => {
              if (sortSelect === 'greenbottle') {
                return `http://bottle4.asuscomm.com:8080/getdalogname?size=${pageSize}&name=green bottle&page=${pageNumber}`
              } else if (sortSelect === 'borwnbottle') {
                return `http://bottle4.asuscomm.com:8080/getdalogname?size=${pageSize}&name=brown bottle&page=${pageNumber}`;
              } else if (sortSelect === 'clearbottle') {
                return `http://bottle4.asuscomm.com:8080/getdalogname?size=${pageSize}&name=clear bottle&page=${pageNumber}`;
              }
              // 기본값으로 설정할 URL 반환
              return `http://bottle4.asuscomm.com:8080/getdalogpage?page=${pageNumber}&size=${pageSize}`;
            };
            
            const url = getPageUrl();  
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
                
              }, [pageNumber, pageSize, sortSelect]);

                const [startDate, setStartDate] = useState(new Date());
                const ExampleCustomInput = ({ value, onClick }) => (
                  <button className="example-custom-input" onClick={onClick}>
                    {value}
                  </button>
                );
              

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
      <div className="searchDiv">
        <select name="SortChoice" value={selectedOption} onChange={handleOptionChange}> 
            <option value="">정렬</option>
            <option value="confidence">인식률</option>
            <option value="specificOption">종류</option>
            <option value="bottleDate">날짜</option>
        </select>
        {showSortSelect && (
        <select value={sortSelect} onChange={handle2OptionChange}>
          <option value="">선택</option>
          <option value="greenbottle" >greenbottle</option>
          <option value="borwnbottle" >borwnbottle</option>
          <option value="clearbottle" >clearbottle</option>
        </select>
      )}
      </div>
    </form>
    
        );
    }
                
    export default Database;