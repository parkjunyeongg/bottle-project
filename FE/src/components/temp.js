const uploadFile = async (file) => {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append('file', file);
  
    // HTTP 요청 보내기
    const response = await fetch('/upload', {
      body: formData
    });
  
    if (response.ok) {
      console.log('파일 업로드 성공!');
    } else {
      console.error('파일 업로드 실패!');
    }
  }
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    uploadFile(file);
  }
  
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );

}