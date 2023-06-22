/*const getPageUrl = () => {
              if (sortSelect === 'greenbottle') {
                return `http://bottle4.asuscomm.com:8080/getdalogname?size=${pageSize}&name={}&page=${pageNumber}`
              } else if (sortSelect === 'brownbottle') {
                return `http://bottle4.asuscomm.com:8080/getdalogname?size=${pageSize}&name=brown_bottle&page=${pageNumber}`;
              } else if (sortSelect === 'clearbottle') {

                return `http://bottle4.asuscomm.com:8080/getdalogname?size=${pageSize}&name=clear_bottle&page=${pageNumber}`;
              } else if (sortSelect === 'date') {
                return `http://bottle4.asuscomm.com:8080/getdalogdate?start=${startDate.toLocaleDateString('en-CA')}T00:00:00&end=${endDate.toLocaleDateString('en-CA')}T23:59:59&size=${pageSize}&page=${pageNumber}`;
              }
                // 기본값으로 설정할 URL 반환
              return `http://bottle4.asuscomm.com:8080/getdalogpage?page=${pageNumber}&size=${pageSize}`;
            };

            const handleOptionChange = (e) => {           //기본 select
                const selectedValue = e.target.value;
                setSelectedSortOption(selectedValue);
                setShowSortSelect(selectedValue === 'specificOption');
                setShowDateSelect(selectedValue === 'bottleDate')
                setShowConfidence(selectedValue === 'ConfidenceOption');
              };
            
              const handle2OptionChange = (event) => {      //종유별 정렬 select
            const selectedValue = event.target.value;
            setSortSelect(selectedValue);
          };
              
<div className="searchDiv">
              <select className="selects" value={selectedSortOption} onChange={handleOptionChange}> 
            <option value="">정렬</option>
            <option value="ConfidenceOption">인식률</option>
            <option value="specificOption">종류</option>
            <option value="bottleDate">날짜</option>
        </select>
        <select className="selects" value={selectedSizeOption} onChange={handlePageSizeChange}> 
            <option value="15">15개씩</option>
            <option value="30">30개씩</option>
            <option value="50">50개씩</option>
            <option value="100">100개씩</option>
        </select>
        {showSortSelect && (
        <select className="selects" value={sortSelect} onChange={handle2OptionChange}>
          <option value="">선택</option>
          <option value="greenbottle" >green bottle</option>
          <option value="brownbottle" >brown bottle</option>
          <option value="clearbottle" >clear bottle</option>
        </select>
        )}
      
        {showDateSelect && (
        <div className="datepick">
          <DatePicker
            className="bottleDate"
            selected={startDate}
            shouldCloseOnSelect
            minDate={new Date('2023-01-01')}
            maxDate={new Date()}
            startDate={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            className="bottleDate"
            selected={endDate}
            shouldCloseOnSelect
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          />
          <button className="searchButton" onClick={handleDateSearch}>검색</button>
        </div>
        )}
        </div>*/