package com.example.demo.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.domain.MemberVO;
import com.example.demo.service.FileService;
import com.example.demo.service.MemberService;

@CrossOrigin("*")
@RestController
public class MemberController {
	@Autowired
	private MemberService memberService;
	@Autowired
	private FileService fileService;

	@GetMapping("/getMember")
	public List<MemberVO> getMemberList() {
		return memberService.getMemberList();
	}

	@PostMapping("/insertMember")
//	@CrossOrigin(origins = "http://localhost:3000")
	public void insertMember(@RequestBody MemberVO memberVO) {
		memberService.insertMember(memberVO);
	}

	@DeleteMapping("/deleteMember")
	public void deleteMember(MemberVO memberVO) {
		memberService.deleteMember(memberVO);
	}

	@PutMapping("/updateMember")
	public void updateMember(MemberVO memberVO) {
		memberService.updateMember(memberVO);
	}

	@PostMapping(value = "/upload",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public void uploadFile(@RequestParam MultipartFile file)  {

		try {
			System.out.println(fileService.saveFile(file));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			 throw new RuntimeException("Failed to upload file", e);
		}
	}

	@GetMapping("/download")
	public ResponseEntity<byte[]> downFile() throws IOException {
		String filepath = fileService.downFile().getFilePath();
		Path imagePath = Path.of(filepath);

		byte[] imageBytes = Files.readAllBytes(imagePath);

		// 이미지 파일의 확장자에 따라 Content-Type 헤더를 동적으로 설정
		String extension = StringUtils.getFilenameExtension(filepath);
		MediaType mediaType = MediaType.IMAGE_JPEG;
		if ("png".equalsIgnoreCase(extension)) {
			mediaType = MediaType.IMAGE_PNG;
		} else if ("gif".equalsIgnoreCase(extension)) {
			mediaType = MediaType.IMAGE_GIF;
		}

		return ResponseEntity.ok().contentType(mediaType).body(imageBytes);
	}

}
