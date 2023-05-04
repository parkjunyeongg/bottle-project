package com.example.demo.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.MemberVO;
import com.example.demo.service.MemberService;
@RestController
public class MenberController {
	@Autowired
	private MemberService memberService;
	
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
	
}
