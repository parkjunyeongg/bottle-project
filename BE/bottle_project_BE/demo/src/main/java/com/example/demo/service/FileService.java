package com.example.demo.service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.domain.FileVO;
import com.example.demo.persistence.FileRepo;

@Service
public class FileService {
	FileVO TempFileVo;
	@Value("${file.upload-dir}")
	private String fileDir;
	@Autowired
	private FileRepo fileRepo;
	//파일 업로드
	public String saveFile(MultipartFile files) throws IOException {
		if(files.isEmpty())
			return "파일이 비었습니다.";
		FileVO fileVO = new FileVO();
		
		fileVO.setOriginalFileName(files.getOriginalFilename());
		fileVO.setSavedFileName(UUID.randomUUID().toString()+files.getOriginalFilename().substring(files.getOriginalFilename().lastIndexOf(".")));
		fileVO.setFilePath(fileDir+fileVO.getSavedFileName());		
		files.transferTo(new File(fileVO.getFilePath()));
		System.out.println(fileVO.toString());
		TempFileVo=fileVO;
		return fileRepo.save(fileVO).toString();			
		  
	}
	
	//파일 다운로드
	public FileVO downFile() {
		FileVO fileVO = new FileVO();
		fileVO = fileRepo.findById(TempFileVo.getId()).get();
		return fileVO;
	}
}
